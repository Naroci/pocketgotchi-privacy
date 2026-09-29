# PocketGotchi — Datenschutzerklärungen

Separates lokales Repository für die EU-/DSGVO- und US-Datenschutztexte.
Stand: 29.09.2026. **Beide Varianten sind Entwürfe mit offenen Freigabepunkten;
die aktuellen lokalen Änderungen wurden nicht zu GitHub gepusht.**

Entwickler, Verantwortlicher und direkte Kontaktperson: Mirco Hoelzenbein
(Privatperson, Südkorea). Datenschutzkontakt:
`codenamedeko@gmail.com`. Vollständige Kontaktdaten stehen in den Erklärungen.
Zielgruppe: hauptsächlich nostalgieinteressierte Erwachsene, auch Kinder.
Deshalb enthalten beide Varianten offene Minderjährigen-/Altersvorgaben.

## Struktur

```text
policies/
  eu/privacy.{de,en,fr,ko,ja}.md   # EU-/DSGVO-Quellen, fünf Sprachen
  us/privacy.en.md               # Eigenständige US-Fassung auf Englisch
./
  index.html                    # Gemeinsamer Einstieg
  privacy/eu/{de,en,fr,ko,ja}/    # EU-HTML-Seiten
  privacy/us/en/                 # US-HTML-Seite
  style.css
  .nojekyll
tools/build_privacy_site.py      # Reproduzierbarer Build und Vollständigkeitsprüfung
docs/GITHUB_PAGES.md             # Veröffentlichung und spätere URLs
docs/EU_NOTES.md                 # EU-Quellen, Projektabgleich, offene Angaben
docs/US_REVIEW.md                # US-Quellen und konkrete Prüfpunkte
docs/VALIDATION.md               # Tatsächlich ausgeführte Prüfungen
firebase.privacy.json            # Frühere Firebase-Vorlage; vor Nutzung getrennten Buildordner anlegen
```

[EU-Fassung Deutsch](policies/eu/privacy.de.md) ·
[EU-Fassung Englisch](policies/eu/privacy.en.md) ·
[US-Fassung Englisch](policies/us/privacy.en.md)

Die US-Fassung behandelt CalOPPA, CCPA/CPRA bei Anwendbarkeit, weitere
anwendbare bundesstaatliche Rechte, Werbe-Opt-out/GPC und COPPA. Sie bestätigt
keine vollständige Umsetzung oder pauschale 50-Staaten-Konformität.

## Lokal erstellen

Python 3.10 oder neuer, keine zusätzlichen Pakete:

```bash
python3 tools/build_privacy_site.py
python3 tools/build_privacy_site.py --check
python3 -m http.server 8766 --bind 127.0.0.1 --directory .
```

Vorschau: `http://127.0.0.1:8766/`. Alle Links funktionieren auch unter dem
GitHub-Pages-Unterpfad eines Repositorys. Die Dateien in dem Repository-Root werden aus
den Markdown-Quellen erzeugt und sollten nicht separat bearbeitet werden.

Vor Veröffentlichung:

```bash
python3 tools/build_privacy_site.py --check --release
```

Diese Prüfung schlägt derzeit absichtlich fehl: Vertragsangaben,
Aufbewahrungsregeln, vollständige Löschwege und Alters-/Werbeprozesse sind noch
offen. US-spezifisch müssen insbesondere tatsächliche Sale-/Sharing-Angaben,
die zurückliegenden zwölf Monate, Opt-out-Signale und Elternprozesse geprüft
werden. Platzhalter durch belegte Angaben ersetzen, Texte fachlich abnehmen
und erst dann die Entwurfsmarkierung entfernen. Der Check ist keine Rechtsprüfung.

## Veröffentlichung

GitHub Pages: Branch `main`, Ordner `/(root)`; URL `https://naroci.github.io/pocketgotchi-privacy/`; siehe
[GitHub Pages](docs/GITHUB_PAGES.md). Dieses Repository enthält keinen Spielcode,
keine Spielstände und keine Firebase-/AdMob-Zugangsdaten. Die bestehenden
Git-Metadaten und `.gitattributes` des Zielverzeichnisses wurden erhalten.
Das Spielprojekt verweist auf dieses Repository als maßgebliche Quelle.
