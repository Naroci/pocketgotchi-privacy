/* PocketGotchi support only. No body/subject/address is stored or logged. */
const SUPPORT_RETENTION = Object.freeze({
  account: 'codenamedeko@gmail.com', supportLabel: 'PocketGotchi/Support',
  closedLabel: 'PocketGotchi/Erledigt', days: 30, prefix: 'pg.closed.',
});

function installSupportRetention() {
  requireSupportAccount_();
  const labels = Gmail.Users.Labels.list('me').labels || [];
  for (const name of [SUPPORT_RETENTION.supportLabel, SUPPORT_RETENTION.closedLabel]) {
    if (!labels.some(l => l.name === name)) Gmail.Users.Labels.create({name}, 'me');
  }
  for (const t of ScriptApp.getProjectTriggers()) {
    if (t.getHandlerFunction() === 'runSupportRetention') ScriptApp.deleteTrigger(t);
  }
  ScriptApp.newTrigger('runSupportRetention').timeBased().everyHours(1).create();
  runSupportRetention(); // First observation starts a new full 30-day period.
}

function requireSupportAccount_() {
  if (Gmail.Users.getProfile('me').emailAddress.toLowerCase() !== SUPPORT_RETENTION.account)
    throw new Error('Wrong account: use the configured PocketGotchi support mailbox.');
}

function runSupportRetention() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return;
  try {
    requireSupportAccount_();
    const props = PropertiesService.getScriptProperties();
    const labels = Gmail.Users.Labels.list('me').labels || [];
    const support = labels.find(l => l.name === SUPPORT_RETENTION.supportLabel);
    const closed = labels.find(l => l.name === SUPPORT_RETENTION.closedLabel);
    if (!support || !closed) throw new Error('Support labels missing; run installSupportRetention.');
    const saved = props.getProperties(), ids = new Set();
    for (const key of Object.keys(saved)) if (key.startsWith(SUPPORT_RETENTION.prefix)) ids.add(key.slice(SUPPORT_RETENTION.prefix.length));
    // Finish pagination before changing messages, so removals cannot shift search pages.
    let pageToken;
    do {
      const page = Gmail.Users.Threads.list('me', {labelIds:[support.id,closed.id], maxResults:100, pageToken});
      for (const t of page.threads || []) ids.add(t.id);
      pageToken = page.nextPageToken;
      if (ids.size > 2000) throw new Error('Support backlog exceeds safe batch size; operator review required.');
    } while (pageToken);
    const now = Date.now(), stats = {checkedAt:new Date(now).toISOString(), started:0, reopened:0, deletedMessages:0, errors:0};
    const started = Date.now();
    // Rotate work after a time limit so an early large thread cannot starve later threads.
    const ordered = [...ids].sort(), cursor = saved['pg.cursor'] || '';
    const order = ordered.filter(id => id > cursor).concat(ordered.filter(id => id <= cursor));
    for (const id of order) {
      if (Date.now() - started > 240000) break;
      try { processSupportThread_(id, support.id, closed.id, props, now, stats); }
      catch (_) { stats.errors++; } // Provider errors may contain email metadata; do not log them.
      props.setProperty('pg.cursor', id);
    }
    props.setProperty('pg.lastRun', JSON.stringify(stats));
    console.log(JSON.stringify(stats));
    if (stats.errors) throw new Error('Support retention incomplete; inspect pg.lastRun and retry. No mail content is logged.');
  } finally { lock.releaseLock(); }
}

function readSupportThread_(id) {
  try {
    return Gmail.Users.Threads.get('me', id, {format:'minimal', fields:'id,messages(id,labelIds)'});
  } catch (e) {
    if (e.details && e.details.code === 404 || /(?:\b404\b|Requested entity was not found)/.test(String(e.message))) return null;
    throw e;
  }
}

function processSupportThread_(id, support, closed, props, now, stats) {
  const key = SUPPORT_RETENTION.prefix + id, raw = props.getProperty(key);
  let state = raw ? JSON.parse(raw) : null;
  let thread = readSupportThread_(id);
  if (!thread || !(thread.messages || []).length) { props.deleteProperty(key); return; }
  const messages = thread.messages;
  // Closing a Gmail conversation labels its existing messages. A reply arriving before
  // the very first scan is not closed and must not silently enter the retention set.
  const eligible = messages.some(m => (m.labelIds || []).includes(support)) &&
    messages.every(m => (m.labelIds || []).includes(closed));
  if (!eligible) {
    if (messages.some(m => (m.labelIds || []).includes(closed)))
      Gmail.Users.Threads.modify({removeLabelIds:[closed]}, 'me', id);
    props.deleteProperty(key); if (state) stats.reopened++; return;
  }
  if (state && (!Number.isFinite(state.closedAt) || !Array.isArray(state.ids) || state.closedAt > now))
    throw new Error('Invalid closure state; preserve mail for operator review.');
  if (state && messages.some(m => !state.ids.includes(m.id))) {
    Gmail.Users.Threads.modify({removeLabelIds:[closed]}, 'me', id);
    props.deleteProperty(key); stats.reopened++; return;
  }
  if (!state) {
    state = {closedAt:now, ids:messages.map(m => m.id)};
    if (JSON.stringify(state).length > 8000) throw new Error('Thread too large for safe closure state.');
    props.setProperty(key, JSON.stringify(state)); stats.started++; return;
  }
  if (now - state.closedAt < SUPPORT_RETENTION.days * 86400000) return;
  // Re-read immediately before deletion. Delete captured message IDs individually, never a
  // whole thread: a reply arriving during deletion must survive and must never inherit expiry.
  thread = readSupportThread_(id);
  if (!thread) { props.deleteProperty(key); return; }
  if ((thread.messages || []).some(m => !state.ids.includes(m.id)) ||
      !(thread.messages || []).some(m => (m.labelIds || []).includes(support)) ||
      !(thread.messages || []).every(m => (m.labelIds || []).includes(closed))) return;
  const remaining = (thread.messages || []).slice().sort((a,b) =>
    Number((a.labelIds || []).includes(support) && (a.labelIds || []).includes(closed)) -
    Number((b.labelIds || []).includes(support) && (b.labelIds || []).includes(closed)));
  for (const message of remaining) {
    Gmail.Users.Messages.remove('me', message.id); stats.deletedMessages++;
  }
  props.deleteProperty(key);
}
