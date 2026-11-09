# Sprint Backlog – StudentCarpool

## 1. Sprint Goal
> La finalul sprintului, un student verificat își poate crea cont, se poate autentifica, poate publica o cursă, iar un alt student o poate căuta, rezerva și anula, iar șoferul poate accepta sau respinge cererea primită.

## 2. Definition of Done (DoD)
- [x] Codul este izolat pe branch dedicat și integrat prin Pull Request cu review
- [x] Testele unitare sunt scrise și trec integral (`npx vitest run`)
- [x] Criteriile de acceptare (Given-When-Then) sunt validate
- [x] Acoperire de teste (coverage) pe modulele de domeniu = 100%
- [x] Test cases documentate și executate în `06_test_cases.md`
- [x] Fără erori de compilare sau bug-uri critice deschise
- [x] Matricea de trasabilitate actualizată (`05_traceability.md`)
- [x] Utilizarea AI declarată și asumată în `07_AI_LOG.md`

## 3. Story-uri Selectate în Sprint

| Story | Abordare | Implementează | Pair / Co-autor | Verifică acceptarea | SP | Fișiere principale |
|---|---|---|---|---|---|---|
| **US-01** Înregistrare email universitar | **TDD** | Victor | – | Andrei | 5 | `src/lib/domain/universityEmail.ts`, `auth.ts` |
| **US-02** Login / Logout | Tradițional + **Pair** | Victor | Daniel | Andrei | 2 | `routes/login`, `src/lib/server/auth.ts` |
| **US-03** Publicare cursă | **TDD** | Andrei | – | Daniel | 5 | `src/lib/domain/rideValidation.ts`, `api/rides` |
| **US-04** Căutare curse | Tradițional + **Pair** | Andrei | Victor | Daniel | 3 | `src/lib/domain/rideSearch.ts`, pagină căutare |
| **US-05** Rezervare loc | **TDD** | Daniel | – | Victor | 5 | `src/lib/domain/booking.ts`, `api/rides/[id]/book` |
| **US-07** Anulare rezervare | **TDD** | Daniel | – | Victor | 3 | `src/lib/domain/booking.ts`, `api/rides/[id]/cancel` |
| **US-06** Acceptare / Respingere cerere | Tradițional + **Pair** | Daniel | Andrei | Victor | 3 | `src/lib/domain/bookingDecision.ts`, `api/bookings/[id]/decision` |
| **US-08a/b** Cursele / Rezervările mele | Tradițional + **Pair** | Victor | Andrei | Daniel | 5 | `src/lib/server/rideRepository.ts`, dashboard |

**Total puncte în Sprint:** 31 SP (echilibrat între cei 3 dezvoltatori: ~10-11 SP per membru).
**Distribuție metodologii:** 4 User Stories prin TDD (US-01, US-03, US-05, US-07) și 4 User Stories prin Tradițional + Pair Programming.
