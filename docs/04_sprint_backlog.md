# Sprint Backlog – StudentCarpool

## 1. Sprint Goal
> La finalul sprintului, un student verificat își poate crea cont, se poate autentifica, poate publica o cursă, iar un alt student o poate căuta, rezerva și anula, iar șoferul poate accepta sau respinge cererea primită.

## 2. Definition of Done (DoD)
- [x] Codul este izolat pe branch dedicat și integrat prin Pull Request cu review
- [x] Testele unitare sunt scrise și trec integral (`npx vitest run`)
- [x] Criteriile de acceptare (Given-When-Then) sunt validate
- [x] Acoperire de teste pe logica de domeniu implementată
- [x] Fără erori de compilare sau bug-uri deschise
- [x] Utilizarea AI documentată în `03_AI_LOG.md`

## 3. Story-uri Selectate în Sprint 1

| Story | Prioritate | Abordare | Implementează | Pair / Co-autor | Verifică acceptarea | Fișiere principale |
|---|:---:|---|---|---|---|---|
| **US-01** Înregistrare email universitar | Must | **TDD** | Victor | – | Andrei | `src/lib/domain/universityEmail.ts`, `auth.ts` |
| **US-02** Login / Logout | Must | Tradițional + **Pair** | Victor | Daniel | Andrei | `routes/login`, `src/lib/server/auth.ts` |
| **US-03** Publicare cursă | Must | **TDD** | Andrei | – | Daniel | `src/lib/domain/rideValidation.ts`, `api/rides` |
| **US-04** Căutare curse | Must | Tradițional + **Pair** | Andrei | Victor | Daniel | `src/lib/domain/rideSearch.ts`, pagină căutare |
| **US-05** Rezervare loc | Must | **TDD** | Daniel | – | Victor | `src/lib/domain/booking.ts`, `api/rides/[id]/book` |
| **US-07** Anulare rezervare | Must | **TDD** | Daniel | – | Victor | `src/lib/domain/booking.ts`, `api/rides/[id]/cancel` |
| **US-06** Acceptare / Respingere cerere | Must | Tradițional + **Pair** | Daniel | Andrei | Victor | `src/lib/domain/bookingDecision.ts`, `api/bookings/[id]/decision` |
| **US-08a/b** Cursele / Rezervările mele | Must | Tradițional + **Pair** | Victor | Andrei | Daniel | `src/lib/server/rideRepository.ts`, dashboard |

**Distribuție metodologii:** 4 User Stories prin TDD (US-01, US-03, US-05, US-07) și 4 User Stories prin Tradițional + Pair Programming.
