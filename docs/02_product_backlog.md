# Product Backlog – StudentCarpool

Backlog-ul de produs conține cerințele funcționale sub formă de User Stories, ordonate după valoarea adusă utilizatorilor și prioritizate conform metodei MoSCoW, conform specificațiilor stabilite de Product Owner (Cosmin Răcuciu).

## Tabel User Stories (22 User Stories)

| # | ID | User Story | Prioritate | Justificare | Depinde de |
|---|---|---|:---:|---|---|
| 1 | **US-01** | Ca student, mă înregistrez cu email universitar, pentru a dovedi că fac parte din comunitate | Must | Fără ea nu există comunitate verificată | – |
| 2 | **US-02** | Ca utilizator, mă autentific și mă deconectez, pentru accesul la cont | Must | Toate acțiunile cer cont | US-01 |
| 3 | **US-03** | Ca șofer, public o cursă, pentru a găsi pasageri | Must | Fără curse nu există oferte în platformă | US-02 |
| 4 | **US-04** | Ca pasager, caut curse după oraș și dată, pentru a găsi cursa potrivită | Must | Valoarea principală de căutare pentru pasager | US-03 |
| 5 | **US-05** | Ca pasager, rezerv un loc, pentru a-mi asigura transportul | Must | Fluxul tranzacțional principal de rezervare | US-04 |
| 6 | **US-06** | Ca șofer, accept sau resping cererile de rezervare, pentru a controla cine urcă în mașină | Must | Încredere, siguranță și control pentru șofer | US-05 |
| 7 | **US-07** | Ca pasager, îmi anulez rezervarea, pentru a elibera locul | Must | Necesară pentru a nu bloca locurile altor colegi | US-05 |
| 8 | **US-08a** | Ca șofer, pot să văd cursele mele și cererile primite | Must | Șoferul gestionează cererile active | US-03 |
| 9 | **US-08b** | Ca pasager, pot să văd rezervările mele și starea lor | Must | Pasagerul urmărește răspunsul șoferului | US-05 |
| 10 | **US-09** | Ca șofer, editez sau anulez o cursă publicată | Should | Flexibilitate când planurile se schimbă | US-03 |
| 11 | **US-10** | Ca utilizator, îmi editez profilul (nume, telefon, universitate) | Should | Încredere și date de contact actualizate | US-02 |
| 12 | **US-11** | Ca pasager, văd costurile estimate per persoană | Should | Transparență în împărțirea costurilor de drum | US-03 |
| 13 | **US-12** | Ca pasager, las un rating după cursă | Should | Reputație și încredere în comunitate | US-08b |
| 14 | **US-13** | Ca utilizator, văd ratingul mediu al șoferului înainte de rezervare | Should | Luarea unei decizii informate la rezervare | US-12 |
| 15 | **US-14** | Ca pasager, filtrez cursele după preț și ora plecării | Should | Confort sporit în găsirea cursei optime | US-04 |
| 16 | **US-15** | Ca utilizator, primesc notificări privind schimbarea stării rezervării | Should | Informare rapidă fără verificare manuală repetată | US-06 |
| 17 | **US-16** | Ca admin, blochez conturile abuzive | Should | Securitate și moderarea comunității | US-02 |
| 18 | **US-17** | Ca admin, pot vedea lista sesizărilor | Could | Panou de moderare pentru incidente raportate | US-16 |
| 19 | **US-18** | Ca utilizator, pot raporta un alt utilizator | Could | Mecanism de feedback pentru comportament abuziv | US-08b |
| 20 | **US-19** | Ca șofer, public curse recurente | Could | Automatizare pentru naveta frecventă | US-03 |
| 21 | **US-20** | Ca utilizator, văd CO₂ economisit | Could | Conștientizare ecologică și motivare | US-08b |
| 22 | **US-21** | Ca utilizator, îmi pot reseta parola prin email | Could | Recuperare securizată a accesului la cont | US-02 |

---

## Criterii de acceptare (Given / When / Then) – Sprint 1

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
