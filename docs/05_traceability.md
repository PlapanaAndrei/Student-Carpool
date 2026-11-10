# Matrice de Trasabilitate – StudentCarpool

Matricea asigură trasabilitatea completă de la cerințele funcționale și non-funcționale la User Stories, fișiere de implementare, suita de teste automate și cazurile de testare manuală.

| Cerință | Story | Implementare (Cod Sursă) | Teste Automate | Test Cases | Stare | Implementat de | Verificat de |
|---|---|---|---|---|---|---|---|
| **FR-01** | US-01 | `src/lib/domain/universityEmail.ts`, `src/lib/schemas/auth.ts` | `universityEmail.test.ts` | TC-01…TC-03 | În lucru | Victor | Andrei |
| **FR-02** | US-02 | `src/lib/server/auth.ts`, rute `login` | E2E Playwright | TC-04…TC-06 | În lucru | Victor + Daniel | Andrei |
| **FR-03** | US-03 | `src/lib/domain/rideValidation.ts`, `api/rides/+server.ts` | `rideValidation.test.ts` | TC-07…TC-10 | În lucru | Andrei | Daniel |
| **FR-04** | US-04 | `src/lib/domain/rideSearch.ts`, pagină căutare | `rideSearch.test.ts` | TC-11…TC-12 | În lucru | Andrei + Victor | Daniel |
| **FR-05** | **US-05** | `src/lib/domain/booking.ts` (`bookSeat`), `src/routes/api/rides/[id]/book/+server.ts` | `tdd/booking.test.ts` | TC-13…TC-16 | **Finalizat (100% testat)** | **Daniel** | Victor |
| **FR-07** | **US-07** | `src/lib/domain/booking.ts` (`cancelBooking`), `src/routes/api/rides/[id]/cancel/+server.ts` | `tdd/booking.test.ts` | TC-17…TC-18 | **Finalizat (100% testat)** | **Daniel** | Victor |
| **FR-06** | **US-06** | `src/lib/domain/bookingDecision.ts` (`respondToBooking`), `src/routes/api/bookings/[id]/decision/+server.ts` | `src/lib/domain/bookingDecision.test.ts` | TC-19…TC-20 | **Finalizat (100% testat)** | **Daniel** (+ Andrei) | Victor |
| **FR-08** | US-08a/b | `src/lib/server/rideRepository.ts`, pagini dashboard | Teste manuale | TC-21 | În lucru | Victor + Andrei | Daniel |
| **FR-11** | US-11 | `src/lib/domain/costSplit.ts` | `costSplit.test.ts` | TC-22 | Backlog | – | – |
| **FR-12** | US-12 | `src/lib/domain/rating.ts` | `rating.test.ts` | TC-23 | Backlog | – | – |
| **FR-16** | US-20 | `src/lib/domain/costSplit.ts` (`co2SavedKg`) | `costSplit.test.ts` | TC-24 | Backlog | – | – |
| **NFR-01** | Securitate | Criptare argon2id în `better-auth` | Unit auth | – | Gata (Baseline) | Andrei | Victor |
| **NFR-04** | Calitate | Vitest runner (`npx vitest run`) | 17 teste active | – | **Activ (17 teste verzi)** | **Daniel** | Victor |
