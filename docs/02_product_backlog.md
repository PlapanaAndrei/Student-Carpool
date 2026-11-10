# Product Backlog – StudentCarpool

Backlog-ul de produs conține cerințele funcționale sub formă de User Stories, ordonate după valoarea adusă utilizatorilor și prioritizate conform metodei MoSCoW. Estimările în Story Points (SP) au fost stabilite în urma sesiunii de Planning Poker (vezi `03_planning_poker.md`).

## Tabel User Stories

| # | ID | User Story | Prioritate | Justificare | Depinde de | SP |
|---|---|---|---|---|---|---|
| 1 | **US-01** | Ca student, mă înregistrez cu email universitar, pentru a dovedi că fac parte din comunitate | Must | Asigură o comunitate închisă și de încredere între studenți | – | 5 |
| 2 | **US-02** | Ca utilizator, mă autentific și mă deconectez, pentru a-mi accesa contul | Must | Necesar pentru accesul la funcționalitățile personalizate | US-01 | 2 |
| 3 | **US-03** | Ca șofer, public o cursă (origine, destinație, dată/oră, locuri, preț), pentru a găsi pasageri | Must | Crearea ofertei de transport în platformă | US-02 | 5 |
| 4 | **US-04** | Ca pasager, caut curse după oraș și dată, pentru a găsi un drum potrivit | Must | Funcționalitatea esențială de căutare pentru pasageri | US-03 | 3 |
| 5 | **US-05** | Ca pasager, rezerv un loc, pentru a-mi asigura transportul | Must | Fluxul tranzacțional principal de rezervare | US-04 | 5 |
| 6 | **US-07** | Ca pasager, îmi anulez rezervarea, pentru a-mi schimba planurile | Must | Permite eliberarea locului pentru alți pasageri înainte de cursă | US-05 | 3 |
| 7 | **US-06** | Ca șofer, accept sau resping cererile de rezervare, pentru a controla cine călătorește cu mine | Must | Siguranță și control pentru șofer | US-05 | 3 |
| 8 | **US-08a** | Ca șofer, văd cursele mele și cererile primite | Must | Managementul curselor active și al solicitărilor | US-03 | 3 |
| 9 | **US-08b** | Ca pasager, văd rezervările mele și starea lor | Must | Monitorizarea statusului cererilor trimise | US-05 | 2 |
| 10 | **US-11** | Ca pasager, văd costul estimat per persoană | Should | Transparență în împărțirea costurilor de drum | US-03 | 2 |
| 11 | **US-09** | Ca șofer, editez sau anulez o cursă publicată | Should | Flexibilitate în cazul modificării programului | US-03 | 3 |
| 12 | **US-10** | Ca utilizator, îmi editez profilul (nume, telefon, universitate) | Should | Menținerea datelor de contact actualizate | US-02 | 2 |
| 13 | **US-12** | Ca pasager, las un rating după cursă | Should | Construirea reputației șoferilor în comunitate | US-08b | 3 |
| 14 | **US-13** | Ca utilizator, văd ratingul mediu al șoferului înainte de rezervare | Should | Luarea unei decizii informate la rezervare | US-12 | 2 |
| 15 | **US-14** | Ca pasager, filtrez cursele după preț și ora plecării | Should | Confort sporit în găsirea cursei optime | US-04 | 2 |
| 16 | **US-15** | Ca utilizator, primesc notificări la schimbarea stării rezervării | Should | Informare rapidă fără verificare manuală repetată | US-06 | 5 |
| 17 | **US-16** | Ca admin, blochez conturi abuzive | Should | Moderare și menținerea standardelor comunității | US-02 | 3 |
| 18 | **US-17** | Ca admin, văd lista sesizărilor | Could | Panou de administrare pentru tichetele primite | US-16 | 3 |
| 19 | **US-18** | Ca utilizator, raportez un alt utilizator | Could | Mecanism de feedback pentru incidente | US-08b | 2 |
| 20 | **US-19** | Ca șofer, public curse recurente | Could | Automatizare pentru naveta frecventă | US-03 | 5 |
| 21 | **US-20** | Ca utilizator, văd CO₂ economisit | Could | Conștientizare ecologică și motivare | US-08b | 2 |
| 22 | **US-21** | Ca utilizator, resetez parola prin email | Could | Recuperare securizată a accesului la cont | US-02 | 3 |

---

## Criterii de acceptare (Given / When / Then) – Sprint Backlog

- **US-01**
  - *Given* un utilizator pe pagina de înregistrare, *When* introduce un email universitar valid (`ion@s.unibuc.ro`), *Then* contul este creat.
  - *When* introduce un domeniu public (`ion@gmail.com`) sau invalid (`ion@evil-unibuc.ro`), *Then* primește mesaj de eroare specific și contul nu este creat.

- **US-02**
  - *Given* un cont activ, *When* introduce datele corecte, *Then* este autentificat și redirecționat în aplicație.
  - *When* datele sunt incorecte, *Then* primește mesaj generic de eroare.
  - *When* apasă „Deconectare”, *Then* sesiunea curentă este invalidată.

- **US-03**
  - *Given* un șofer autentificat, *When* trimite o cursă cu date valide, *Then* cursa este salvată și devine vizibilă la căutare.
  - *When* data este în trecut, numărul de locuri este invalid (≤ 0 sau > 8), originea coincide cu destinația sau prețul este negativ, *Then* salvarea este refuzată cu mesaj de eroare corespunzător.

- **US-04**
  - *Given* curse existente în platformă, *When* pasagerul caută după orașe și dată, *Then* primește lista curselor deschise cu locuri libere, ordonate cronologic (fără ca diacriticele să influențeze potrivirea).

- **US-05**
  - *Given* o cursă cu locuri disponibile, *When* un pasager solicită un loc, *Then* este generată o cerere `pending`, iar numărul de locuri libere scade cu 1.
  - *When* cursa este plină, pasagerul are deja o cerere activă sau pasagerul este chiar șoferul cursei, *Then* rezervarea este refuzată.

- **US-06**
  - *Given* o cerere de rezervare în starea `pending`, *When* șoferul cursei o acceptă, *Then* cererea devine `accepted`.
  - *When* șoferul o respinge, *Then* cererea devine `rejected`, iar locul este re-eliberat în cursă.
  - *When* alt utilizator încearcă să ia o decizie, *Then* acțiunea este refuzată (403/409).

- **US-07**
  - *Given* o rezervare activă (`pending` sau `accepted`), *When* pasagerul o anulează înainte de ora plecării, *Then* statusul devine `cancelled` și locul devine din nou disponibil.
  - *When* pasagerul încearcă anularea după ora plecării, *Then* operațiunea este refuzată.

- **US-08a / US-08b**
  - *Given* un utilizator autentificat, *When* accesează secțiunea proprie („Cursele mele” / „Rezervările mele”), *Then* vizualizează doar înregistrările asociate contului său și statusul lor actualizat.

---

## Observații de Refinement (INVEST)

- **US-08**: A fost divizat în două componente distincte: `US-08a` (dashboard șofer) și `US-08b` (dashboard pasager) pentru a respecta criteriul *Small* și a permite alocarea paralelă.
- **US-03**: Validările de date sunt complet decuplate de UI, fiind izolate în modulul de domeniu (`validateRide`).
- **US-05**: Logica tranzacțională de rezervare este decuplată de persistență (`bookSeat`), permițând testarea unitară 100% fără baze de date active.
- **Diferențiatori de produs**: Validarea strictă a comunității academice (US-01), algoritmul transparent de împărțire a costurilor (US-11) și metrica ecologică de CO₂ (US-20).
