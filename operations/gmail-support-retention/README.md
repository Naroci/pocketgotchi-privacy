# Gmail: abgeschlossene PocketGotchi-Supportanfragen automatisch löschen

Vorbereitet, noch nicht im Gmail-Konto aktiviert. Lokal mit simulierten Gmail-Antworten geprüft;
kein Zugriff auf echte E-Mails. Das Skript arbeitet unabhängig vom Pi, sofern Google den
stündlichen Apps-Script-Trigger ausführt. Keine zusätzliche kostenpflichtige Infrastruktur.

## Einmalige Einrichtung (im Konto codenamedeko@gmail.com)

1. In https://script.google.com/ ein neues eigenständiges Projekt anlegen: `PocketGotchi Support Retention`.
2. Den Inhalt von `Code.gs` in den Editor kopieren.
3. Unter **Project Settings → Show appsscript.json manifest file in editor** das Manifest einblenden
   und durch die beiliegende `appsscript.json` ersetzen. Es aktiviert den erweiterten Gmail-Dienst.
   Bei einem eigenen Cloud-Projekt zusätzlich die Gmail API dort aktivieren.
4. `installSupportRetention` auswählen und **Run** ausführen. Google-Berechtigungen prüfen und
   im richtigen Konto erteilen. Die breite Gmail-Berechtigung ist für endgültige Löschung notwendig.
   Es wird nichts versendet. Anschließend muss unter **Triggers** genau ein stündlicher
   `runSupportRetention`-Trigger sichtbar sein. Fehlerbenachrichtigung im Trigger auf sofort stellen.
5. In Gmail Supportgespräche mit `PocketGotchi/Support` markieren. Erst bei tatsächlichem
   Abschluss zusätzlich `PocketGotchi/Erledigt` setzen. Beide Labels sind erforderlich.
6. Nach dem ersten Lauf **Project Settings → Script Properties → pg.lastRun** prüfen:
   `errors: 0` und frisches `checkedAt`. In **Executions** müssen die regelmäßigen Läufe erfolgreich sein.
   Erst nach dieser Betreiberabnahme darf die Datenschutzerklärung aktive Gmail-Automatik behaupten.

## Frist und Wiederöffnung

Die 30 Tage beginnen beim ersten stündlichen Erkennen des Abschlusslabels, nicht beim Empfang
und nicht rückwirkend. Nach 30×24 Stunden erfolgt endgültige Löschung im nächsten erfolgreichen Lauf
(normalerweise innerhalb einer weiteren Stunde). Einträge werden nicht nur in den Papierkorb gelegt,
weil Gmail sie dort noch einmal 30 Tage behalten könnte. Nachrichten sind danach nicht wiederherstellbar.

Zum Wiederöffnen `PocketGotchi/Erledigt` entfernen und `runSupportRetention` einmal manuell ausführen,
bevor dasselbe Gespräch erneut geschlossen wird. Entfernen und Neusetzen zwischen zwei Läufen kann
Gmail ohne Labelzeitstempel nicht zuverlässig erkennen. Eine neue Antwort vor dem Löschlauf entfernt
automatisch das Abschlusslabel und verlangt einen neuen bewussten Abschluss. Während der Löschung
neu eintreffende Nachrichten werden niemals mitgelöscht; bereits gelöschte alte Nachrichten lassen
sich bei dieser seltenen Überschneidung nicht wiederherstellen.

Es werden nur IDs bereits erfasster Nachrichten gelöscht, nie eine ganze Unterhaltung. Andere
E-Mails bleiben außerhalb des Auftrags. Teilfehler behalten den Fristzustand für den nächsten Versuch.
Erledigt-Markierungen sind nicht für noch offene Rechts-/Abrechnungsfälle bestimmt; diese benötigen
eine gesondert begründete Aufbewahrung. Keine pauschale Ausnahme durch das Skript.

Der Zustand enthält interne Thread-/Nachrichten-IDs und Abschlusszeitpunkte, keine Mailinhalte oder
Adressen. Er wird nach Löschung oder erkannter Wiederöffnung entfernt. Maximal 2.000 erfasste Gespräche;
zu große Gespräche/Quota-/Berechtigungsfehler werden sichtbar als Fehler gemeldet. Trigger sind keine
Echtzeitgarantie: Bei Google-Ausfall oder entzogenen Rechten erfolgt Nachholung erst beim nächsten
funktionierenden Lauf. Kopien/Weiterleitungen, exportierte Mailarchive und Googles eigene Sicherungen
werden hierdurch nicht bereinigt. Keine Mailkopien in SQL oder zusätzliche lokale Supportbackups anlegen.

Prüfung: `node tests.cjs` (nur lokale Fakes).
Quellen: https://developers.google.com/apps-script/advanced/gmail und
https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/delete
