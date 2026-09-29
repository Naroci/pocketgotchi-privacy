# Historie und EU-Freigabehinweise

Hinweis: Die folgenden Pfade und Firebase-Befehle dokumentieren den Stand
vor dem Umzug von `public/` in den Repository-Root. Maßgeblich sind README und
GITHUB_PAGES.

Diese Hinweise sind auf die neue Ordnerstruktur angepasst. Aktueller Einstieg:
[README](../README.md). Eine US-Fassung wurde separat ergänzt.

# PocketGotchi: Datenschutzerklärung und öffentlicher Link

Stand 29.09.2026. **Vorbereiteter, nicht veröffentlichungsfertiger Entwurf.**
Der Nutzer hat sich als Privatperson Mirco Hoelzenbein mit Anschrift in Südkorea
benannt; diese Angaben sind in allen fünf Quellen eingetragen. Datenschutzkontakt ist `codenamedeko@gmail.com`. Der Nutzer nennt vorwiegend
nostalgieinteressierte Erwachsene, aber auch Kinder als Zielgruppe. Mindestalter
und die technische Umsetzung des Schutzes Minderjähriger bleiben offen. GitHub Pages ist für diese Datenschutzseiten als Hostinganbieter gewählt. [GitHub-Pages-Anleitung](GITHUB_PAGES.md).
Eine Standardvorlage allein macht weder App noch Werbekonfiguration DSGVO-konform.
Betreiberangaben, tatsächliche Verträge, Zielgruppe und Löschabläufe müssen zum
Text passen. Sprachfassungen einschließlich fr/ko/ja benötigen fachkundige Abnahme;
sie ersetzen keine zusätzlich erforderlichen nationalen Datenschutzangaben.

## Dateien

- Bearbeitbare Erklärungen: `policies/eu/privacy.de.md`, `policies/eu/privacy.en.md`, `policies/eu/privacy.fr.md`,
  `policies/eu/privacy.ko.md`, `policies/eu/privacy.ja.md` vom Repository-Stamm.
- Generierte HTML-Seiten: `privacy/eu/{de,en,fr,ko,ja}/index.html`.
- Gemeinsamer Einstieg: `index.html`.
- Getrennte Hostingkonfiguration: `firebase.privacy.json`. Es werden keine Spielfunktionen mitdeployt.

Die Texte beschreiben den aktuellen Teststand. Keine Produktions-SSV-/Kaufaktivität
und keine automatische Kontolöschung werden als bereits verfügbar dargestellt.
Es gibt keine getrennte, widersprüchliche AdMob-Erklärung: dieselbe App-Erklärung
mit AdMob-Abschnitt kann in AdMob und Play Console verlinkt werden.

## Noch benötigte Angaben

Die verbleibenden Angaben für alle fünf Sprachfassungen prüfen:

| Platzhalter | Benötigte Tatsache |
| --- | --- |
| Name / Anschrift (bereits eingetragen) | Mirco Hoelzenbein als Privatperson; vom Nutzer angegebene Anschrift in Südkorea |
| Datenschutz-E-Mail (bereits eingetragen) | `codenamedeko@gmail.com` für Anfragen und Löschung |
| DATENSCHUTZBEAUFTRAGTER_FALLS_ERFORDERLICH / EU_VERTRETER_FALLS_ERFORDERLICH | Gesonderte Rollen prüfen. Mirco Hoelzenbein ist Entwickler, Verantwortlicher und direkter Kontakt; ein gegebenenfalls nach Art. 27 DSGVO erforderlicher EU-Vertreter muss in der EU niedergelassen und separat benannt werden. |
| GOOGLE_CLOUD_VERTRAGSPARTNER | Vertragspartner aus tatsächlich akzeptierten Firebase-/Cloud-Verträgen |
| ANZEIGENPARTNER_ODER_KEINE_WEITEREN | AdMob-Auswahl einschließlich Bidding/Mediation/Google-Ad-Technologieanbieter prüfen; keine Partnerfreiheit aus fehlenden Adaptern ableiten |
| Firestore-Standortkennung / TRANSFERGARANTIEN | USA laut Nutzer; genaue Firestore-Standortkennung und anwendbare Übermittlungsgrundlagen noch prüfen. Die Functions-Region beweist die Datenbankregion nicht. |
| KONTO_UND_BACKUP_LOESCHFRISTEN | Verbindlicher, technisch umgesetzter Lösch-/Inaktivitäts-/Backupplan |
| SUPPORT_FRIST | Tatsächliche Aufbewahrung von Kontaktanfragen |
| AUFSICHTSBEHOERDE | Für den echten Betreibersitz zuständige Aufsicht |
| MINDESTALTER_UND_KINDERKONZEPT | Gemischte Zielgruppe laut Nutzer, Schwerpunkt Erwachsene; Mindestalter, Play-Families-/AdMob-Kinderkonfiguration und erforderliche Alters-/Elternprozesse festlegen |
| GitHub-Pages-Protokolle | GitHub Pages ist in allen Fassungen eingetragen. GitHub dokumentiert IP-Protokollierung aus Sicherheitsgründen, aber hier ist keine feste Frist belegbar; deshalb keine Frist erfinden. |

Nur Platzhalter zu entfernen genügt nicht: veränderte Funktionen oder rechtliche
Zuordnungen müssen in allen Texten inhaltlich aktualisiert werden. Die
Entwurfszeile erst nach dieser Prüfung entfernen.

## Historische Alternative: Firebase Hosting

Option A: eine **eigene Hosting-Site** im bereits verwendeten Firebase-Projekt
`pocketgotchi-918ab`. Damit werden bestehende Webseiten nicht überschrieben.
Firebase stellt HTTPS-Adressen unter `SITE_ID.web.app` und `SITE_ID.firebaseapp.com`
bereit; eine eigene Domain ist nicht erforderlich. Die vorbereitete Site-ID lautet
`pocketgotchi-918ab-privacy`; Verfügbarkeit und Berechtigung sind noch nicht geprüft.
Es wurden weder eine Site angelegt noch Inhalte veröffentlicht. Die Firebase-CLI
war bei der lokalen Prüfung nicht im PATH vorhanden.

Vorgesehene Adresse **erst nach erfolgreicher Anlage und Veröffentlichung**:

```text
https://pocketgotchi-918ab-privacy.web.app/privacy/
https://pocketgotchi-918ab-privacy.web.app/privacy/eu/de/
https://pocketgotchi-918ab-privacy.web.app/privacy/eu/en/
https://pocketgotchi-918ab-privacy.web.app/privacy/eu/fr/
https://pocketgotchi-918ab-privacy.web.app/privacy/eu/ko/
https://pocketgotchi-918ab-privacy.web.app/privacy/eu/ja/
```

Dies sind geplante Zieladressen, keine bereits erreichbaren Links.

Vom Projektstamm lokal erzeugen und prüfen:

```bash
python3 tools/build_privacy_site.py
python3 tools/build_privacy_site.py --check
python3 -m http.server 8765 --bind 127.0.0.1 --directory public
```

Danach im Browser `http://127.0.0.1:8765/privacy/` öffnen. Kein Login, JavaScript,
Tracking, externe Fonts oder PDF-Download sind für das Lesen notwendig.

Nach Vervollständigung, fachlicher Freigabe und Installation/Anmeldung der
offiziellen Firebase-CLI folgende Schritte bewusst einzeln ausführen:

```bash
python3 tools/build_privacy_site.py
python3 tools/build_privacy_site.py --check --release
firebase hosting:sites:list --project pocketgotchi-918ab
firebase hosting:sites:create pocketgotchi-918ab-privacy --project pocketgotchi-918ab
firebase deploy --only hosting --config firebase.privacy.json --project pocketgotchi-918ab
```

Die letzte Zeile veröffentlicht öffentlich. Erst weitergehen, wenn die vorherige
Prüfung erfolgreich war. `--release` verweigert aktuell absichtlich die Freigabe
wegen offener Angaben; es ist eine Vollständigkeitsprüfung, keine Rechtsprüfung.
Die Firebase-CLI selbst umgeht diesen Check, daher den Deploy-Befehl nicht vorher
ausführen. Falls die Site bereits existiert, Eigentum und Inhalte zuerst prüfen;
niemals eine belegte fremde Site wiederverwenden. Bei anderer Site-ID das Feld
`hosting.site` und die Zieladressen anpassen. **Kein `firebase init` und kein
pauschales `firebase deploy`** für diese Aufgabe: damit könnten vorhandene
Functions-/Projektkonfigurationen betroffen sein.

Nach Deployment die tatsächliche HTTPS-URL ohne Anmeldung in einem privaten
Browserfenster und auf dem Handy prüfen: alle fünf Sprachen, HTTP 200, lesbarer
Text, funktionierende Kontaktangaben, keine Entwurfsmarkierungen. Erst dann:

1. AdMob → Datenschutz und Mitteilungen → europäische Verordnungen → betroffene
   App auswählen/bearbeiten → URL der Datenschutzerklärung hinterlegen. Die
   Bezeichnungen können sich in der Oberfläche ändern. Anzeigenpartner und
   angebotene Sprachen mit den Texten abgleichen und erforderliche Meldung freigeben.
2. Play Console → App-Inhalte → Datenschutzerklärung: dieselbe bestätigte URL
   eintragen; Datensicherheitsangaben müssen sämtliche verwendeten SDKs abbilden.
3. Im Spiel einen dauerhaft erreichbaren Link auf die Erklärung ergänzen. Der
   vorhandene UMP-Menüpunkt „Werbe-Datenschutz“ ersetzt diesen Link nicht. Aktuell
   wurde bewusst keine noch nicht erreichbare URL in die App eingebaut.

Option B: [GitHub Pages](GITHUB_PAGES.md). Ebenso kann eine vorhandene Website
genutzt werden. Alle lokalen Seiten-/Stylesheet-Links sind relativ und funktionieren
auch unter einem Repository-Unterpfad. Bei jedem Hoster die tatsächlichen
Hostingangaben in allen Sprachfassungen vervollständigen.

## Vor der Produktionsfreigabe der App

- UMP/CMP inklusive Ablehnen, Widerruf, erforderlichem Wiedereinstieg und
  Länderfällen tatsächlich auf Android prüfen. `canRequestAds()` ist kein Beweis
  einer Einwilligung in Personalisierung. Der aktuelle Java-Anschluss fragt den
  Status beim Werbetest ab, nicht generell bei jedem App-Start; mit der aktuellen
  UMP-Anleitung vor Produktionsfreigabe abgleichen.
- Google Play verlangt bei Kontenerstellung einen auffindbaren Löschweg in der
  App und einen externen Webweg. Ein Kontaktabschnitt allein ist keine Abnahme
  dieser Anforderungen. Auth-Konto, Firestore-Archiv, spätere Rewardtabellen und
  Backups im Löschprozess berücksichtigen. Abmelden reicht nicht.
- Der vorbereitete SSV-Code speichert UID, Challenge, Anzeigenblock, Transaktion,
  Zeitstände, Tageszähler und Berechtigungen. Vor Aktivierung den Datenfluss in
  allen Erklärungen ergänzen und echte Aufbewahrungs-/Löschjobs umsetzen.
  `expiresAt` und der 24-Stunden-Rechteablauf sind keine automatische Datenlöschung.
  Functions sind im Entwurf für `asia-northeast3` vorgesehen; tatsächliche
  Firestore-/Backupregionen sind separat festzustellen.
- Kein Analytics-/Crashlytics-Tracking allein aus vorhandenen Frameworkklassen
  ableiten; tatsächlich ausgelieferte SDKs und Netzwerkverkehr prüfen. Bei
  weiteren Partnern, Analytics oder IAP Texte und Play-Datensicherheit anpassen.
- Zielgruppe und Anbieterrollen rechtlich prüfen; bei Sitz außerhalb der EU
  insbesondere Art. 3/27 DSGVO und eventuell weitere nationale Pflichten prüfen.

## Abgleich mit dem Projekt

Die folgenden Pfade gehören zum separaten Spielprojekt
`/home/mdmm/Documents/Codex/2026-09-21/pocketkin`, nicht zu diesem Repository.
Geprüfte Stellen: `src/Services/Online/PocketOnlineService.cs` (Google-Testblock,
keine Belohnung), `platform/android/src/main/java/org/gameforger/platform/GameForgerPlatform.java`
(UMP/Anzeigen), `src/Services/Cloud/PocketKinCloudService.cs` (freiwillige Anmeldung,
Cloudwahl und Abmelden), `src/Model/Cloud/GameArchive.cs` (Archivfelder),
`addons/game_forger/Services/Backend/Firebase/FirebaseAuthService.cs` (Sitzung),
`src/PocketScreenContent.Cloud.cs` (Datenschutzoptionen), `server/rewards/main.py`
(SSV noch nicht veröffentlicht) und `docs/M5_SETUP.md`.

## Primärquellen, abgerufen am 29.09.2026

- [DSGVO, insbesondere Art. 5–8, 12–22, 27, 28 und 44–49](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679)
- [TDDDG-Gesamtausgabe, insbesondere § 25](https://www.gesetze-im-internet.de/ttdsg/BJNR198210021.html)
- [Google EU User Consent Policy](https://www.google.com/about/company/user-consent-policy/)
- [UMP: Einwilligung und Privacy Options](https://developers.google.com/admob/android/privacy)
- [Mobile Ads: Datenarten und Play-Datensicherheit](https://developers.google.com/admob/android/privacy/play-data-disclosure)
- [AdMob-Richtlinien](https://support.google.com/admob/answer/6128543?hl=de)
- [Google Play: Nutzerdaten, Datenschutz-URL und Kontolöschung](https://support.google.com/googleplay/android-developer/answer/10144311?hl=de)
- [Google-Datenschutzerklärung](https://policies.google.com/privacy?hl=de)
- [Google-Aufbewahrung](https://policies.google.com/technologies/retention?hl=de)
- [Firebase-Datenschutz und Verantwortlichkeiten](https://firebase.google.com/support/privacy)
- [Firebase Hosting: Einrichtung und Deployment](https://firebase.google.com/docs/hosting/quickstart)
- [Separate Firebase-Hosting-Sites](https://firebase.google.com/docs/hosting/multisites)

§ 25 wurde über die offizielle Gesamtausgabe geprüft; die Einzelseite war über
das Recherchewerkzeug nicht abrufbar.
