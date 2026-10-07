const vm = require('node:vm'), fs = require('node:fs'), assert = require('node:assert/strict');
let now = 1800000000000, data = {}, threads = {}, deleted = [], fail = null, pageCalls = 0;
const labels=[{id:'support',name:'PocketGotchi/Support'},{id:'closed',name:'PocketGotchi/Erledigt'}];
const props={getProperties:()=>({...data}),getProperty:k=>data[k]||null,setProperty:(k,v)=>{data[k]=v;},deleteProperty:k=>{delete data[k];}};
const context=vm.createContext({Date:class extends Date {static now(){return now;}}, console:{log(){}}, Set, Number, Object,
 PropertiesService:{getScriptProperties:()=>props},LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock(){}})},
 Gmail:{Users:{getProfile:()=>({emailAddress:'codenamedeko@gmail.com'}),Labels:{list:()=>({labels})},Threads:{
 list:(_,opts)=>{pageCalls++;const ids=Object.keys(threads).filter(id=>threads[id].messages.some(m=>m.labelIds.includes('support')&&m.labelIds.includes('closed'))); const start=Number(opts.pageToken||0);return {threads:ids.slice(start,start+1).map(id=>({id})),nextPageToken:start+1<ids.length?String(start+1):undefined};},
 get:(_,id)=>{if(!threads[id]){const e=new Error('not found');e.details={code:404};throw e;}return JSON.parse(JSON.stringify(threads[id]));},
 modify:(body,_,id)=>{threads[id].messages.forEach(m=>m.labelIds=m.labelIds.filter(l=>!body.removeLabelIds.includes(l)));}},
 Messages:{remove:(_,id)=>{if(id===fail)throw new Error('provider unavailable');deleted.push(id);for(const t of Object.values(threads))t.messages=t.messages.filter(m=>m.id!==id);}}}}
});
vm.runInContext(fs.readFileSync(__dirname+'/Code.gs','utf8'),context);
function run(){vm.runInContext('runSupportRetention()',context);}
function thread(id,ids,ls=['support','closed']){threads[id]={id,messages:ids.map(id=>({id,labelIds:[...ls]}))};}
function reset(){data={};threads={};deleted=[];fail=null;pageCalls=0;}
let checks=0;function check(c,m){assert.ok(c,m);checks++;console.log('PASS: '+m);}
thread('a',['1','2']);run();check(JSON.parse(data['pg.closed.a']).closedAt===now,'label observation starts full period');
now+=30*86400000-1;run();check(deleted.length===0,'never deletes before 30 days');
now++;run();check(deleted.join(',')==='1,2'&&!data['pg.closed.a'],'exact boundary permanently deletes captured messages and state');
reset();thread('a',['1']);run();threads.a.messages[0].labelIds=['support'];run();check(!data['pg.closed.a'],'observed reopening clears clock');
now+=86400000;threads.a.messages[0].labelIds.push('closed');run();check(JSON.parse(data['pg.closed.a']).closedAt===now,'reclosure starts new clock');
now+=31*86400000;threads.a.messages.push({id:'new',labelIds:[]});run();check(!data['pg.closed.a']&&!threads.a.messages[0].labelIds.includes('closed')&&!deleted.length,'new reply reopens instead of deleting');
reset();thread('a',['1'],['support']);thread('b',['2'],['closed']);run();check(!Object.keys(data).some(k=>k.startsWith('pg.closed.'))&&!deleted.length,'both labels required');
reset();thread('a',['1']);thread('b',['2']);run();check(pageCalls===2&&data['pg.closed.a']&&data['pg.closed.b'],'all search pages observed before mutation');
now+=31*86400000;fail='2';assert.throws(run);check(deleted.join(',')==='1'&&data['pg.closed.b']&&JSON.parse(data['pg.lastRun']).errors===1,'provider errors visible and failed state retained');
fail=null;run();check(deleted.join(',')==='1,2'&&!data['pg.closed.b'],'failed deletion retried');
reset();thread('a',['1','2']);run();now+=31*86400000;fail='2';assert.throws(run);check(data['pg.closed.a']&&deleted.join(',')==='1','partial deletion keeps expiry');fail=null;run();check(deleted.join(',')==='1,2'&&!data['pg.closed.a'],'partial deletion resumes with remaining IDs');
reset();thread('a',['1']);run();delete threads.a;run();check(!data['pg.closed.a'],'already removed conversation clears state');
reset();thread('a',['1']);run();now+=31*86400000;const remove=context.Gmail.Users.Messages.remove;context.Gmail.Users.Messages.remove=(_,id)=>{threads.a.messages.push({id:'raced',labelIds:[]});remove(_,id);};run();check(threads.a.messages[0].id==='raced'&&!deleted.includes('raced'),'reply arriving during deletion survives');context.Gmail.Users.Messages.remove=remove;
reset();thread('a',['1']);threads.a.messages.push({id:'early-reply',labelIds:[]});run();check(!data['pg.closed.a']&&!threads.a.messages[0].labelIds.includes('closed'),'reply before first scan cannot be marked closed implicitly');
context.Gmail.Users.getProfile=()=>({emailAddress:'wrong@example.com'});assert.throws(run);check(true,'wrong account blocked');
console.log(checks+' support retention checks passed');
