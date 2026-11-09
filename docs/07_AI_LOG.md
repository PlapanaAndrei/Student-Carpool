# AI Log – Registru de Utilizare Asistenți AI

Registru de trasabilitate pentru instrumentele AI utilizate în dezvoltarea proiectului StudentCarpool, documentând scopul, rezultatul obținut, intervenția manuală și modul de validare tehnică.

| # | Instrument | Scop | Prompt / Solicitare (rezumat) | Rezultat obținut | Intervenție manuală / Ce s-a modificat | Mod de validare tehnică | Responsabil |
|---|---|---|---|---|---|---|---|
| 1 | Claude | Analiza cerințelor și ghid de proiect | Analiză temă MOPS și structură proiect StudentCarpool | Rezumat al etapelor, rolurilor și cerințelor funcționale | Structurat etapele în calendarul de sprint pe 7 zile | Verificare conformitate cu specificațiile temei | Cosmin |
| 2 | Claude | Propunere inițială de User Stories | Generare propunere de Product Backlog și Sprint Backlog | Listă inițială de 21 de User Stories | Rafinare în echipă: divizat US-08 în 08a/08b, definit criterii Given-When-Then clare | Sesiune de refinement INVEST și prioritizare MoSCoW | Cosmin |
| 3 | Claude | Analiză proiect de baseline (UrbanFlow) | Identificare module reutilizabile și componente de eliminat | Raport cu modulele de tranzit/trafic și biblioteci de auth | Planificat curățarea modulelor redundante și adaptarea schemelor | Analiză manuală a fișierelor din baseline | Andrei |
| 4 | Claude | Scaffolding logică de domeniu | Structurare modele pure și teste inițiale | Structuri orientative în `src/lib/domain/*` | Rescris logica de business prin TDD, adaptat tipurile și semnatura funcțiilor | Rulare teste unitare Vitest (`npx vitest run`) | Daniel |
| 5 | Claude | Schiță de schemă DB și repository | Propunere tabele Drizzle pentru curse și rezervări | Schiță `schema.carpool.ts` și `rideRepository.ts` | Adaptat relațiile cheie străină și constrângerile de integritate | Migrări Drizzle și verificări sintactice | Andrei |
| 6 | Claude | Template-uri documentație | Generare schelete pentru cazuri de testare și trasabilitate | Fișiere inițiale Markdown în `docs/` | Completat datele reale ale echipei, scenariile și tabelele de evaluare | Review de echipă | Victor |
| 7 | Antigravity CLI | Documentare Planning Poker și implementare TDD (US-05, US-07, US-06) | Setup, estimare Planning Poker, implementare TDD Red-Green pentru rezervare, anulare și decizie rezervare | `docs/03_planning_poker.md`, `tdd/booking.test.ts`, `src/lib/domain/booking.ts`, `src/lib/domain/bookingDecision.ts`, endpoint-uri API `/api/rides/[id]/book`, `/api/rides/[id]/cancel`, `/api/bookings/[id]/decision` | Refactorizare cod pentru eliminarea boilerplate-ului, corectarea fallback-urilor din endpoint-uri și curățarea testelor | 17 teste unitare Vitest validate cu succes (Faza Red confirmată, urmată de Faza Green) | Daniel |

## Notă intrare activitate (Daniel)
Membrul: Daniel. Instrument: Antigravity CLI (Agent AI autonom). Scop: Generarea documentului de Planning Poker și implementarea prin Test-Driven Development (TDD) pentru User Stories US-05, US-07 și US-06. Validare: Codul și testele unitare au fost rulate și verificate manual.
