# GitHub Pages: beide regionalen Fassungen

Dieses Repository enthält Markdown-Quellen, Prüfhinweise und das generierte
Webseitenverzeichnis `public/`. Die bestehende Git-Konfiguration wird beim lokalen
Verschieben nicht geändert. Ein lokaler Repository-Ordner ist noch keine öffentliche
Website; es wurde nichts gepusht oder aktiviert.

## Veröffentlichung nach Vervollständigung

1. Offene Felder aller sechs Quellen in `policies/` klären und fachlich prüfen.
   Bei Wahl von GitHub Pages den tatsächlichen Hostinganbieter mit dessen
   [Datenschutzhinweisen](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
   einsetzen. GitHub protokolliert Besucher-IP-Adressen für Sicherheitszwecke;
   keine unbelegte feste Löschfrist versprechen. Verträge, Rolle und internationale
   Verarbeitung separat von den Google-Diensten der App einordnen.
2. `python3 tools/build_privacy_site.py` und anschließend
   `python3 tools/build_privacy_site.py --check --release` ausführen. Nur bei Erfolg
   weitergehen. Das aktuelle Ergebnis ist wegen der Entwürfe absichtlich negativ.
3. Für die Veröffentlichung aus diesem Repository einen GitHub-Pages-Workflow
   verwenden, dessen hochgeladenes Webseiten-Artefakt ausschließlich `public/`
   enthält. In GitHub **Settings → Pages → Source: GitHub Actions** wählen.
   Einen Workflow erst bei tatsächlicher Veröffentlichungsentscheidung einrichten;
   dieses Repository aktiviert keine automatische Veröffentlichung.
4. Alternativ den Inhalt von `public/` in einen eigens gewählten Pages-Branch
   übernehmen und **Settings → Pages → Deploy from a branch**, diesen Branch und
   **/(root)** wählen. Die Quellstruktur des Hauptbranches dabei erhalten.
   Nicht den gesamten Hauptbranch als Webseiteninhalt auswählen.
5. Nach erfolgreichem Deployment die angezeigte URL ohne Anmeldung und mobil
   prüfen; soweit angeboten **Enforce HTTPS** aktivieren. Name und Postanschrift
   in den Seiten sind dann öffentlich; bei öffentlichem Quellrepository auch
   dessen Historie. Diese Anleitung führt keinen Upload aus.

## Geplante URL-Struktur

```text
https://BENUTZERNAME.github.io/pocketgotchi-privacy/
https://BENUTZERNAME.github.io/pocketgotchi-privacy/privacy/eu/de/
https://BENUTZERNAME.github.io/pocketgotchi-privacy/privacy/eu/en/
https://BENUTZERNAME.github.io/pocketgotchi-privacy/privacy/eu/fr/
https://BENUTZERNAME.github.io/pocketgotchi-privacy/privacy/eu/ko/
https://BENUTZERNAME.github.io/pocketgotchi-privacy/privacy/eu/ja/
https://BENUTZERNAME.github.io/pocketgotchi-privacy/privacy/us/en/
```

Beispiele, keine bereits erreichbaren Links. `BENUTZERNAME` durch den wirklichen
GitHub-Accountnamen ersetzen. Der gemeinsame Einstieg verlinkt beide Regionen;
es gibt keine automatische Geolokalisierung und keine Einschränkung von Rechten
durch die Seitenauswahl. Nach Veröffentlichung die verifizierte URL in AdMob,
Play Console und im Spiel eintragen. Regionale AdMob-Meldungen und Opt-out-
Mechanismen müssen zusätzlich korrekt konfiguriert werden.

## Firebase als Alternative

`firebase.privacy.json` veröffentlicht ausschließlich `public/` auf der vorgesehenen
separaten Site `pocketgotchi-918ab-privacy`. Site-Anlage und Deployment erst nach
Freigabe; die CLI-Befehle stehen in [EU_NOTES](EU_NOTES.md). Keine Functions sind
in diesem Repository enthalten. GitHub Pages übernimmt die Firebase-HTTP-Header
nicht; die Seite selbst benötigt weder Skripte noch Drittanbieterressourcen.

## Offizielle Quellen

- [GitHub Pages und Datenverarbeitung](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Pages-Site erstellen](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Veröffentlichungsquelle konfigurieren](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Google Play: Nutzerdaten und Datenschutzerklärung](https://support.google.com/googleplay/android-developer/answer/10144311?hl=de)
