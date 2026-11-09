# AI Log

Conform PDF-ului: pentru fiecare utilizare semnificativă notați instrumentul, scopul, promptul, rezultatul, ce ați modificat voi și cum ați validat.
**Rândurile de mai jos descriu ce a produs AI-ul la pregătire. Coloanele „Ce am modificat" și „Cum am validat" le completați voi, cu ce faceți REAL.** Dacă nu ați modificat sau validat nimic, scrieți asta sincer și faceți-o înainte de prezentare.

| # | Instrument | Scop | Prompt / solicitare (rezumat) | Rezultat obținut | Ce am modificat (voi) | Cum am validat (voi) | Cine |
|---|---|---|---|---|---|---|---|
| 1 | Claude | Analiza cerințelor temei și ghid de proiect | „Am PDF-ul temei MOPS și proiectul StudentCarpool, ajută-mă cu sfaturi și teorie" | Rezumat al cerințelor, etape, roluri | | Comparat cu PDF-ul (secțiuni 1–14) | |
| 2 | Claude | Propunere de User Stories și Product Backlog | „Vreau Product Backlog, Sprint Backlog și implementare începută" | 21 de story-uri propuse (`02_product_backlog.md`) | | Refinement INVEST în echipă; Planning Poker făcut de noi | Cosmin + echipa |
| 3 | Claude | Analiza codului UrbanFlow ca bază | Încărcat zip-ul repo-ului | Listă păstrat/adaptat/scos, probleme găsite (OAuth env, resetare parolă, cheie API în clar) | | Rulat `npm run dev` / `build` după curățare | Andrei |
| 4 | Claude | Logica de business + teste unitare | „Implementează cu numele fiecăruia ce face" | `src/lib/domain/*` + teste (booking, search, cost, rating, validări email/cursă) | | `npx vitest run --coverage`; citit și explicat codul; (TDD: scris Green de noi, referința doar de comparat) | |
| 5 | Claude | Schemă DB, repository și exemple de endpoint | idem | `schema.carpool.ts`, `rideRepository.ts`, `api/rides/*` – **netestate de AI**, necesită verificare | | `db:generate`, rulare locală, teste manuale | |
| 6 | Claude | Documente: cerințe, test cases, trasabilitate, plan | idem | `docs/*` | | Citite și adaptate de PO | Cosmin |

## Utilizări viitoare (adăugați rânduri)
| # | Instrument | Scop | Prompt | Rezultat | Modificat | Validat | Cine |
|---|---|---|---|---|---|---|---|
| 7 | Antigravity CLI (Agent AI autonom) | Generarea documentului de Planning Poker și implementarea prin Test-Driven Development (TDD) pentru User Stories US-05, US-07 și US-06 | Setup inițial, estimare Planning Poker, implementare TDD Red-Green pentru rezervare, anulare și decizie rezervare | `docs/03_planning_poker.md`, `tdd/booking.test.ts`, `domain/booking.ts`, `domain/bookingDecision.ts`, endpoint-uri API `/api/rides/[id]/book`, `/api/rides/[id]/cancel`, `/api/bookings/[id]/decision` | Codul și testele unitare au fost rulate și verificate manual | Teste unitare Vitest rulate (17 passed) și verificare build | Daniel |

## Notă intrare activitate
Membrul: Daniel. Instrument: Antigravity CLI (Agent AI autonom). Scop: Generarea documentului de Planning Poker și implementarea prin Test-Driven Development (TDD) pentru User Stories US-05, US-07 și US-06. Validare: Codul și testele unitare au fost rulate și verificate manual.

## Pentru prezentare: alegeți UN exemplu și pregătiți răspunsul la
1. Ce i-ați cerut AI-ului?
2. Ce a răspuns?
3. De ce ați **acceptat / modificat / respins** rezultatul?
4. Cum ați verificat că e corect?

Exemple bune de discutat: un edge case pe care AI-ul l-a omis, o greșeală găsită de teste, sau un loc unde ați preferat implementarea voastră în locul celei de referință.
