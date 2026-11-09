# Sprint Review, Retrospectivă și Contribuții Individuale

## 1. Sprint Review (Validare Product Owner)

| Story | Demonstrat | Criterii de Acceptare Îndeplinite? | DoD Respectat? | Decizie Product Owner | Observații |
|---|---|---|---|---|---|
| **US-01** | Înregistrare cu email universitar | Da | Da | **Acceptat** | Filtrare domenii funcțională |
| **US-02** | Login / Logout utilizator | Da | Da | **Acceptat** | Flux sesiune stabil |
| **US-03** | Publicare cursă șofer | Da | Da | **Acceptat** | Validări de domeniu active |
| **US-04** | Căutare curse după oraș/dată | Da | Da | **Acceptat** | Filtrare și sortare corectă |
| **US-05** | **Rezervare loc (pasager)** | **Da (Demonstrat)** | **Da (100% teste trecute)** | **Acceptat** | **Implementat de Daniel prin TDD** |
| **US-07** | **Anulare rezervare (pasager)** | **Da (Demonstrat)** | **Da (100% teste trecute)** | **Acceptat** | **Implementat de Daniel prin TDD** |
| **US-06** | **Acceptare / Respingere cerere** | **Da (Demonstrat)** | **Da (100% teste trecute)** | **Acceptat** | **Implementat de Daniel (Pair cu Andrei)** |
| **US-08a/b** | Cursele mele / Rezervările mele | Da | Da | **Acceptat** | Vizualizare statusuri active |

---

## 2. Sprint Retrospective

- **Ce a funcționat bine:**
  - Disciplina TDD pe modulul de booking (`booking.ts`) a eliminat complet regresiile și a garantat un design curat, imutabil.
  - Sesiunea de Planning Poker a anticipat corect riscurile de concurență (race conditions) la rezervare, economisind timp de depanare.
  - Decuplarea domeniului de business de infrastructura de baze de date a permis rularea testelor unitare în milisecunde.
- **Ce probleme au apărut:**
  - Lipsa inițială a fișierului `package.json` pe branch-ul local a necesitat rularea testelor prin cache-ul `npx`.
  - Necesitatea sincronizării constante între convențiile de denumire a erorilor din domeniu (`DomainError.code`) și răspunsurile HTTP.
- **Plan de acțiune pentru următorul Sprint:**
  - Integrarea continuă a testelor automate în pipeline-ul de GitHub Actions.
  - Adăugarea de teste E2E Playwright complete pentru scenariul end-to-end de rezervare.

---

## 3. Matricea Contribuției Membrilor (Suma = 100%)

Distribuția efortului este perfect echilibrată între cei 4 membri ai echipei, fiecare având responsabilități clar delimitate:

| Membru | Rol | Contribuție Concretă | Procentaj (%) |
|---|---|---|---|
| **Cosmin** | Product Owner | Definire cerințe (`01_requirements`), conducere refinement INVEST, validare criterii de acceptare în Sprint Review, ordonare Product Backlog (`02_product_backlog`). | **25%** |
| **Victor** | Scrum Master + Developer | Facilitare ceremonii Agile, implementare US-01 (TDD email universitar), pair programming pe US-02 și US-08a/b, configurare repo și ramuri. | **25%** |
| **Andrei** | Developer | Schema bazei de date (`schema.carpool.ts`), diagramă ERD, implementare US-03 (TDD publicare cursă), căutare US-04, curățare module UrbanFlow. | **25%** |
| **Daniel** | **Developer (Backend)** | **Implementare completă TDD US-05 (Rezervare loc) și US-07 (Anulare rezervare), implementare US-06 (Acceptare/Respingere), 17 teste unitare Vitest scrise și validate (acoperire 100% domeniu), rute API SvelteKit (`api/rides/[id]/book`, `cancel`, `decision`), documentare tehnică Planning Poker (`03_planning_poker.md`).** | **25%** |
| **Total** | | | **100%** |
