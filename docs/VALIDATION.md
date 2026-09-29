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
