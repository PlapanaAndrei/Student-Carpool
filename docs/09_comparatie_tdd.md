# Analiză Comparativă: TDD vs Abordare Tradițională & Pair Programming

Acest document analizează eficiența procesului de dezvoltare din cadrul Sprint-ului, comparând metodologiile aplicate de echipă: Test-Driven Development (TDD) versus dezvoltare clasică și Pair Programming versus lucru individual.

## 1. Tabel Comparativ pe User Stories

| Story | Metodologie | Responsabil | Timp Lucru | Cicluri Red → Green | Defecte Găsite Post-Implementare | Coverage Modul | Observații Tehnice |
|---|---|---|---|---|---|---|---|
| **US-01** | TDD | Victor | 4h | 3 cicluri | 0 | 95% | Validarea emailului universitar definită mai întâi prin regex-uri eșuate. |
| **US-03** | TDD | Andrei | 5h | 4 cicluri | 0 | 92% | Cazurile limită pentru intervalul de locuri (1-8) tratate din start. |
| **US-05** | **TDD** | **Daniel** | **4h** | **7 teste în faza Red → Green** | **0** | **100%** | Testele scrise inițial au forțat designul imutabil al stării și prevenirea race conditions la rezervare. |
| **US-07** | **TDD** | **Daniel** | **3h** | **5 teste în faza Red → Green** | **0** | **100%** | Cazurile de anulare tardivă (`RIDE_DEPARTED`) și re-eliberarea locului garantate prin specificația din teste. |
| **US-02** | Pair Programming | Victor + Daniel | 3h | – | 1 (sesiune cookie) | 75% | Pair-ul a ajutat la sincronizarea rapidă între frontend-ul Svelte și backend-ul `better-auth`. |
| **US-04** | Pair Programming | Andrei + Victor | 4h | – | 0 | 85% | Căutare optimizată cu normalizare de diacritice implementată eficient în pereche. |
| **US-06** | **Pair Programming** | **Daniel + Andrei** | **3h** | – | **0** | **100%** | Verificarea permisiunilor de șofer și modelarea deciziei de `reject` (cu eliberare de loc) concepute în tandem. |
| **US-08** | Pair Programming | Victor + Andrei | 4h | – | 1 (query duplicat) | 70% | Complexitate ridicată de agregare SQL în paginile de dashboard. |

---

## 2. Concluzii și Învățăminte Tehnice

### 1. Evoluția procesului de testare: TDD vs Tradițional
- **La TDD (US-05, US-07):** Testele au fost scrise **înainte** de a exista orice logică funcțională (Faza RED – funcțiile aruncau `throw new Error("Not implemented")`). Acest pas a funcționat ca o specificație executabilă vie. Implementarea (Faza GREEN) s-a concentrat strict pe satisfacerea testelor existente, fără over-engineering sau cod mort.
- **La Tradițional / Pair (US-06):** Codul a fost scris în paralel cu discuțiile de design, iar testele unitare au fost adăugate imediat după definitivarea logicii pentru a asigura regresia.

### 2. Avantaje și limitări observate la TDD
- **Avantaje:**
  - Zero bug-uri de logică găsite după finalizare pe componentele `booking.ts`.
  - Încredere absolută la refactorizare: curățarea comentariilor și a tipurilor s-a făcut în câteva secunde, având certitudinea că toate cele 17 teste rămân verzi.
  - Decuplare arhitecturală completă: logica din domeniu nu depinde de driverul de PostgreSQL sau de SvelteKit runtime.
- **Dezavantaje / Costuri:**
  - Timp inițial de configurare a mock-urilor de date mai ridicat.
  - Necesită disciplină riguroasă pentru a nu scrie cod de implementare înainte de confirmarea eșecului testelor.

### 3. Efectele Pair Programming
- Rolurile alternative (Driver / Navigator) la implementarea deciziei de rezervare (US-06) și login-ului (US-02) au eliminat erorile de tip `typo` și au accelerat luarea deciziilor legate de tratarea erorilor HTTP (ex. utilizarea codului 409 Conflict vs 400 Bad Request).

### 4. Nivelul de acoperire obținut (Test Coverage)
- Pe nucleul de domeniu (`src/lib/domain/booking.ts` și `src/lib/domain/bookingDecision.ts`), acoperirea ramurilor și a liniilor de cod este de **100%**.
- Testele rulează instantaneu (sub 150ms) cu `npx vitest run`, fără a necesita pornirea bazei de date Docker.
