# GitHub Pages: beide regionalen Fassungen

Dieses Repository enthält Markdown-Quellen, Prüfhinweise und die generierten
Webseiten-Dateien im Repository-Root. Die bestehende Git-Konfiguration wird beim lokalen
Verschieben nicht geändert. Die aktuellen lokalen Änderungen sind noch nicht gepusht; eine bereits
erreichbare Website kann deshalb einen älteren Stand zeigen.

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
3. In GitHub **Settings → Pages → Build and deployment → Source:
   Deploy from a branch** wählen. Branch **main**, Ordner **/(root)** auswählen
   und speichern. Die Einstiegdatei `index.html` liegt jetzt direkt im Root.
4. Änderungen erst nach erfolgreicher Prüfung committen und pushen. Eine
   zusätzliche Actions-Konfiguration ist für diese Struktur nicht nötig.
5. Nach erfolgreichem Deployment die angezeigte URL ohne Anmeldung und mobil
   prüfen; soweit angeboten **Enforce HTTPS** aktivieren. Name und Postanschrift
   in den Seiten sind dann öffentlich; bei öffentlichem Quellrepository auch
   dessen Historie. Diese Anleitung führt keinen Upload aus.

## Geplante URL-Struktur

```text
https://naroci.github.io/pocketgotchi-privacy/
https://naroci.github.io/pocketgotchi-privacy/privacy/eu/de/
https://naroci.github.io/pocketgotchi-privacy/privacy/eu/en/
https://naroci.github.io/pocketgotchi-privacy/privacy/eu/fr/
https://naroci.github.io/pocketgotchi-privacy/privacy/eu/ko/
https://naroci.github.io/pocketgotchi-privacy/privacy/eu/ja/
https://naroci.github.io/pocketgotchi-privacy/privacy/us/en/
```

Dies ist die URL-Struktur für den Repository-Account `Naroci`. Nach jedem
Push die Erreichbarkeit und den ausgelieferten Stand gesondert prüfen. Der gemeinsame Einstieg verlinkt beide Regionen;
es gibt keine automatische Geolokalisierung und keine Einschränkung von Rechten
durch die Seitenauswahl. Nach Veröffentlichung die verifizierte URL in AdMob,
Play Console und im Spiel eintragen. Regionale AdMob-Meldungen und Opt-out-
Mechanismen müssen zusätzlich korrekt konfiguriert werden.

## Firebase als Alternative

`firebase.privacy.json` verweist noch auf den früheren Ordner `public/` und
darf in diesem Stand nicht verwendet werden. Für Firebase Hosting zunächst einen
getrennten Ausgabeordner aus den Webseiten-Dateien aufbauen, dessen `public`-Pfad
eintragen und unabhängig von den Quelltexten prüfen. Die Vorlage zielt auf eine
separaten Site `pocketgotchi-918ab-privacy`. Site-Anlage und Deployment erst nach
Freigabe; die CLI-Befehle stehen in [EU_NOTES](EU_NOTES.md). Keine Functions sind
in diesem Repository enthalten. GitHub Pages übernimmt die Firebase-HTTP-Header
nicht; die Seite selbst benötigt weder Skripte noch Drittanbieterressourcen.

## Offizielle Quellen

- [GitHub Pages und Datenverarbeitung](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Pages-Site erstellen](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Veröffentlichungsquelle konfigurieren](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Google Play: Nutzerdaten und Datenschutzerklärung](https://support.google.com/googleplay/android-developer/answer/10144311?hl=de)
