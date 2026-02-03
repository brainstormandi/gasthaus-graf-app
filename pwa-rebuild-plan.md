# PWA Rebuild: Gasthaus Graf

## Goal
Erstellung einer modernen, hochperformanten PWA für das Gasthaus Graf, die exakt die Funktionen der bestehenden Vercel-App übernimmt, die Daten von gasthausgraf.at synchronisiert und das UI/UX für Tischreservierung und Speisekarte optimiert.

## Core Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules / Vanilla CSS (Rich Aesthetics)
- **Data Fetching:** Custom Next.js API Routes (Scraper-based)
- **PWA:** next-pwa / serwist
- **Animations:** Framer Motion (Micro-interactions)

## Tasks
- [x] Task 1: Scaffolding mit Next.js 15 und PWA-Konfiguration → Verify: `npm run dev` startet ohne Fehler, Manifest/Service Worker vorhanden
- [x] Task 2: Implementierung der Daten-Execution-Scripts (Scraping von gasthausgraf.at für Menü, Events, Öffnungszeiten) → Verify: JSON-Output in `.tmp/data.json` korrekt
- [x] Task 3: Design-System & Layout (Header, Footer, Navigation) → Verify: Responsive Header mit Hamburger-Menü auf Mobilgeräten
- [x] Task 4: Modernisierte Speisekarte mit Kategorien und Filter-Optionen → Verify: Karte ist interaktiv und zeigt gecachte Daten
- [x] Task 5: Optimiertes Tischreservierungsformular mit Echtzeit-Validierung → Verify: Formular sendet Daten an Mock-API/Email
- [x] Task 6: Home-Dashboard mit aktuellen Mittagsmenüs & Öffnungszeiten → Verify: Daten werden dynamisch von der Website gezogen und gecacht
- [x] Task 7: Offline-Support & Caching-Strategie → Verify: App funktioniert ohne Internetverbindung mit zuletzt geladenen Daten
- [x] Task 8: Finaler UX-Audit & Performance-Check → Verify: Lighthouse Score > 90 in allen Kategorien

## Done When
- [ ] PWA läuft lokal mit allen Funktionen (Karten, Reservierung, News)
- [ ] Daten werden automatisch von der Quellseite synchronisiert
- [ ] Interface fühlt sich "Premium" und modern an (Rich Aesthetics)
- [ ] Offline-Fähigkeit ist gegeben
