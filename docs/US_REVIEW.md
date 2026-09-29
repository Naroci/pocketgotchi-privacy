# US-Datenschutz: Prüfgrundlage und offene Freigabepunkte

Stand 29.09.2026. Quelle des englischen Entwurfs: `policies/us/privacy.en.md`.
Dies ist eine eigenständige US-Fassung, keine Übersetzung der DSGVO-Erklärung.
Eine landesweit einheitliche Pflichtenvorlage ist für diese App nicht belegbar:
Bundesrecht, Staatengesetze, Schwellenwerte und Zielgruppe sind getrennt zu prüfen.

## Einordnung

- CalOPPA: Kategorien/Empfänger, Änderungsverfahren, Datum, Zugang zu eigenen
  Daten sowie DNT-/Drittanbietertracking-Angaben berücksichtigt. Die allgemeinen
  Transparenzpflichten dürfen nicht mit den CCPA-Schwellen verwechselt werden.
- CCPA in der durch CPRA geänderten Fassung: nur bei tatsächlicher Anwendbarkeit.
  Privatperson/Sitz Südkorea ist kein pauschaler Ausschluss. Die zuständige
  Behörde nennt seit 01.01.2025 eine inflationsangepasste Umsatzschwelle von
  26.625.000 USD; außerdem können andere Kriterien greifen. Umsatz, Datenvolumen,
  Werbeverträge und Verkauf/Sharing sind unbekannt, deshalb keine erfundene
  Feststellung der Anwendbarkeit oder Befreiung.
- Rechte unter weiteren anwendbaren Staatengesetzen, etwa Colorado und Texas:
  Auskunft/Kopie, Berichtigung, Löschung, Opt-out, gegebenenfalls Beschwerde gegen
  eine Ablehnung und besondere Regeln für sensible Daten. Auch Ausnahmen kleiner
  Unternehmen können gesetzesspezifische Grenzen haben. Kein vollständiges
  50-Staaten-Rechtsgutachten oder erschöpfender Vergleich von Minderjährigenregeln.
- COPPA: Die Nutzerangabe „vorwiegend Erwachsene, auch Kinder“ rechtfertigt weder
  „nur Erwachsene“ noch „keine Daten unter 13“. Die FTC-Einordnung hängt auch von
  tatsächlicher Gestaltung, Vermarktung und Publikum ab. Den aktuellen Rule-Text
  einschließlich der 2025 verabschiedeten Änderungen vor Release zugrunde legen.

## Vor Veröffentlichung konkret erledigen

1. Sämtliche US-Platzhalter anhand echter Verträge, Einstellungen und veröffentlichter
   Builds auflösen. Die Datenkategorien der vergangenen zwölf Monate bestätigen;
   der aktuelle Code belegt keine vollständige Historie.
2. Verkauf/Sharing/Targeted Advertising pro Kategorie und Empfänger bestimmen.
   Keine pauschale „wir verkaufen nie Daten“-Aussage allein wegen fehlender
   Geldzahlung. AdMob-US-Meldungen, Restricted Data Processing und Partnerzwecke
   prüfen; RDP allein erfüllt nicht sämtliche Pflichten des Betreibers.
3. Dauerhaften Opt-out-Einstieg und erforderliche Universal-Opt-out-Signale/GPC
   technisch umsetzen, Umfang (Browser/Gerät/Konto) erklären und testen. UMP-
   Verfügbarkeit oder E-Mail allein ist kein Nachweis dieser Implementierung.
   Die statische Informationsseite hat selbst keine Werbetracker, aber auch
   keine Funktion, Signale in die Android-App zu übertragen.
4. Rechtzeitige Anfrage-, Identitätsprüfungs-, Vertreter-, Lösch- und
   Beschwerdeverfahren umsetzen. Die jeweiligen Bestätigungs-, Antwort- und
   Opt-out-Fristen beachten; nicht alle Anfragen dürfen 45 Tage dauern.
   Zusätzliche vorgeschriebene Kontaktwege nach Geschäftsmodell prüfen.
5. Minderjährigenkonzept tatsächlich umsetzen: rechtliche Zielgruppeneinordnung,
   neutrale Alterserfassung, soweit zulässig/erforderlich, getrennte Elterninformation
   mit Namen/Kontakten aller relevanten Betreiber, überprüfbare Elternzustimmung,
   Elternrechte, Datenminimierung und befristete Löschung. Keine Datenerhebung
   vor zulässiger Einwilligung auf bloße spätere E-Mail-Löschung stützen.
6. Sensible Informationen einschließlich Zugangsdaten und Minderjährigendaten
   richtig einordnen. Fiktive Monster-DNA ist dagegen kein menschliches Genom.
7. GitHub Pages als Hostinganbieter ist eingetragen. Konkrete Protokollfristen
   und die genaue US-Firestore-Standortkennung bleiben zu prüfen; internationale
   Verarbeitung einschließlich des südkoreanischen Betreibers transparent halten.
8. Fachkundige rechtliche Prüfung für tatsächlich bediente US-Staaten;
   bei Änderungen der App alle regionalen Fassungen gemeinsam aktualisieren.

## Primärquellen, gelesen am 29.09.2026

- [California BPC § 22575 (CalOPPA)](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=22575.&lawCode=BPC)
- [California Attorney General: CCPA](https://oag.ca.gov/privacy/ccpa)
- [CalPrivacy: angepasste Geldschwellen](https://privacy.ca.gov/laws-and-regulations/monetary-thresholds-in-the-ccpa/)
- [CalPrivacy: aktuelle Regeln](https://privacy.ca.gov/laws-and-regulations/)
- [FTC: COPPA-FAQ und mixed audience](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions)
- [FTC: 2025 beschlossene COPPA-Änderungen](https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-finalizes-changes-childrens-privacy-rule-limiting-companies-ability-monetize-kids-data)
- [Colorado Attorney General: CPA](https://coag.gov/resources/colorado-privacy-act/)
- [Texas Attorney General: Consumer Privacy Rights](https://www.texasattorneygeneral.gov/consumer-protection/file-consumer-complaint/consumer-privacy-rights)
- [AdMob: US-state privacy und RDP](https://developers.google.com/admob/android/privacy/us-states)

Die Quellen belegen Regelungsbereiche und Anforderungen; sie bestätigen keine
rechtskonforme Implementierung von PocketGotchi. Ein erfolgreicher HTML-Build
ist ebenfalls keine Rechtsprüfung.
