## GitHub Pages und Firebase-Land konkretisiert – 29.09.2026

Alle fünf EU-Fassungen und die US-Fassung nennen GitHub Pages als Hoster und
beschreiben GitHubs belegte Sicherheitsprotokollierung ohne erfundene Löschfrist.
Cloud Firestore ist laut Nutzer in den USA; die genaue Standortkennung bleibt
offen. Weitere Vertrags-, Minderjährigen-, Werbe- und Löschangaben sind nicht
aus GitHub Pages oder dem Speicherland ableitbar und bleiben Freigabepunkte.

## Verantwortlicher konkretisiert – 29.09.2026

Alle fünf EU-Sprachfassungen und die US-Fassung benennen Mirco Hoelzenbein
ausdrücklich als Entwickler, Verantwortlichen und direkten Datenschutzkontakt.
Datenschutzbeauftragter und ein gegebenenfalls nach Art. 27 DSGVO erforderlicher,
in der EU niedergelassener Vertreter bleiben getrennte Prüfpunkte. Der Generator
wurde nach der Textänderung erneut ausgeführt und abgeglichen.

## Root-Umzug für GitHub Pages – 29.09.2026

Der Inhalt von `public/` wurde in den Repository-Root verschoben: `index.html`,
`privacy/`, `style.css`, `.nojekyll`. Der Generator schreibt und prüft diese
Rootstruktur. GitHub Pages kann nun `main` + `/(root)` verwenden; nach einem Push
liegen die HTML-Seiten unter `/pocketgotchi-privacy/privacy/…`.
Die Firebase-Vorlage ist nach dem Umzug nicht direkt deploybar und wird vor
Nutzung neu konfiguriert. Keine Texte oder Einwilligungsabläufe wurden verändert.

# Prüfung am 29.09.2026

- Fünf EU-Quellen bytegleich aus dem Spielprojekt übernommen; eigenständige
  englische US-Quelle ergänzt. Kontaktdaten und gemischte Zielgruppe stimmen überein.
- `python3 tools/build_privacy_site.py`: PASS, sechs Erklärungen, zehn HTML-Seiten.
- `python3 tools/build_privacy_site.py --check`: PASS, reproduzierbare Ausgabe,
  sämtliche relativen Regions-/Sprach-/Stylesheet-Links auf vorhandene Ziele geprüft.
- Öffentlicher Ordner enthält ausschließlich die zehn HTML-Seiten, CSS und
  `.nojekyll`; keine Skripte, Formulare, Frames oder externen eingebetteten Inhalte.
- `--check --release`: erwarteter Exitcode 1 wegen offener Angaben und
  Entwurfsmarkierungen. Keine Aussage über vollständige rechtliche Konformität.
- Die neue Struktur funktioniert ohne Bibliotheken oder Dateien aus dem
  Spielprojekt. Firebase-Konfiguration zeigt ausschließlich auf `public/`.
- Ursprüngliche Dateien vor dem Umzug per SHA-256 erfasst. Zielbestand wurde
  vor dem Entfernen der alten Dateien vollständig auf Inhaltsgleichheit geprüft.

Keine Veröffentlichung, keine Git-Commits/-Pushes, keine Änderung von Konten,
Produktions-Ads, Spielcode oder echten Spielständen. Offene Rechts-/Produktangaben
stehen in EU_NOTES und US_REVIEW. Sprachkundige US-/EU-Endabnahme bleibt offen.

Zusätzlich: US-Seite im echten Browser in Desktopbreite sowie US und EU Deutsch
bei 390×844 geprüft. Regionswechsel, Entwurfsanzeige und Textumbruch bestanden.
Nach Entfernung der alten Dateien besteht der unabhängige --check im Ziel erneut.
Im Spielprojekt verbleiben nur Dokumentationsverweise auf dieses Repository.
