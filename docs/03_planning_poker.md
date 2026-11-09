# Planning Poker – Estimare Product Backlog (StudentCarpool)

## 1. Metodologia Planning Poker și Șirul Fibonacci

Planning Poker este o tehnică agilă de estimare relativă, bazată pe consens, utilizată de echipele Scrum pentru a dimensiona efortul, complexitatea și incertitudinea User Story-urilor. În loc de estimări în ore sau zile calendaristice (care sunt subiective și variază dramatic în funcție de nivelul de senioritate al fiecărui programator), efortul este exprimat în **Story Points (SP)**.

### De ce șirul Fibonacci?
Se folosește o secvență bazată pe șirul Fibonacci: **1, 2, 3, 5, 8, 13, 21**. 
Proprietatea cheie a acestui șir este că distanța dintre valori consecutive crește proporțional cu mărimea valorii. Acest lucru reflectă direct principiul psihofizic (Legea Weber-Fechner): pe măsură ce o sarcină este mai mare și mai complexă, incertitudinea crește exponențial, iar distincția fină devine iluzorie (de exemplu, este ușor să distingem între o sarcină de 1 SP și una de 2 SP, dar este imposibil și nerelevant să dezbatem dacă o sarcină este de 11 SP sau 12 SP; folosim 13 SP).

### Regulile sesiunii de vot:
1. **Roluri:**
   - **Cosmin (Product Owner):** Prezintă fiecare User Story, explică cerințele funcționale și criteriile de acceptare (Given-When-Then), clarifică întrebările tehnice. Nu votează (nu este dezvoltator).
   - **Victor (Scrum Master & Developer), Andrei (Developer), Daniel (Developer):** Dezvoltatorii responsabili de implementare și testare; fiecare alege în secret o carte cu valoarea SP.
2. **Revelare simultană:** Toți dezvoltatorii își arată cărțile în același timp pentru a evita ancorarea sau influențarea votului de către colegi.
3. **Dezbatere:** Dacă voturile converg (ex. diferențe minime precum 2 și 3), se convine rapid asupra valorii prin consens. Dacă există o divergență majoră (ex. 2 vs 5 sau 3 vs 8), dezvoltatorii cu valorile extreme își prezintă argumentele tehnice, riscurile identificate și ipotezele avute în vedere.
4. **Revotare (Runda 2):** Se revotează până la atingerea consensului.
5. **Story Etalon:** A fost stabilit **US-02 (Autentificare/Deconectare)** la **2 SP**, întrucât funcționalitatea de bază există deja în infrastructura de baseline (`better-auth`).

---

## 2. Tabel Estimare User Stories (22 User Stories)

| # | ID | User Story (Rezumat) | Prioritate | Victor R1 | Andrei R1 | Daniel R1 | Victor R2 | Andrei R2 | Daniel R2 | SP Final | Justificare tehnică / Decizie consens |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **US-01** | Înregistrare cu email universitar | Must | 3 | 2 | 5 | 5 | 5 | 5 | **5** | Dezbatere 2 vs 5 SP; validare strictă regex/domenii whitelist și flux verificare email. |
| 2 | **US-02** | Autentificare și deconectare | Must | 2 | 2 | 2 | 2 | 2 | 2 | **2** | Story etalon; structura existentă în baseline, necesită doar adaptare UI și sesiune. |
| 3 | **US-03** | Publicare cursă (șofer) | Must | 5 | 3 | 5 | 5 | 5 | 5 | **5** | Validări multiple de domeniu (ora viitoare, orașe distincte, locuri 1-8, preț) și persistență. |
| 4 | **US-04** | Căutare curse după oraș și dată | Must | 3 | 3 | 3 | 3 | 3 | 3 | **3** | Normalizare diacritice, query DB cu filtrare după status open și locuri disponibile. |
| 5 | **US-05** | Rezervare loc (pasager) | Must | 5 | 5 | 8 | 5 | 5 | 5 | **5** | Dezbatere 3/8 vs 5 SP; gestionare concurență/race conditions și izolare domeniu pur. |
| 6 | **US-07** | Anulare rezervare (pasager) | Must | 1 | 2 | 3 | 3 | 3 | 3 | **3** | Dezbatere 1 vs 3 SP; verificare oră plecare (anulare doar înainte) și re-eliberare loc. |
| 7 | **US-06** | Acceptare / Respingere cerere (șofer) | Must | 3 | 3 | 3 | 3 | 3 | 3 | **3** | Control acces (doar șoferul cursei), tranziție status și eliberare loc la refuz. |
| 8 | **US-08a** | Dashboard șofer (cursele mele & cereri) | Must | 3 | 3 | 3 | 3 | 3 | 3 | **3** | Filtrare query după `driverId`, agregare pasageri pending/accepted per cursă. |
| 9 | **US-08b** | Dashboard pasager (rezervările mele) | Must | 2 | 2 | 3 | 2 | 2 | 2 | **2** | Query simplu al rezervărilor active/istorice asociate pasagerului curent. |
| 10 | **US-11** | Estimare cost per persoană | Should | 2 | 2 | 2 | 2 | 2 | 2 | **2** | Calcul algoritmic pur de împărțire a costului pe baza pasagerilor confirmați. |
| 11 | **US-09** | Editare / Anulare cursă publicată | Should | 3 | 3 | 3 | 3 | 3 | 3 | **3** | Schimbare status cursă în `cancelled` și notificare/anulare în cascadă a rezervărilor. |
| 12 | **US-10** | Editare profil utilizator | Should | 2 | 2 | 2 | 2 | 2 | 2 | **2** | Formular clasic de actualizare date profil (nume, telefon, universitate). |
| 13 | **US-12** | Acordare rating după cursă | Should | 3 | 3 | 3 | 3 | 3 | 3 | **3** | Validare ca utilizatorul să fi participat efectiv la cursă; interval note 1-5. |
| 14 | **US-13** | Afișare rating mediu șofer | Should | 2 | 2 | 2 | 2 | 2 | 2 | **2** | Agregare SQL `AVG(rating)` și număr recenzii, cache opțional la nivel de profil. |
| 15 | **US-14** | Filtrare avansată (preț, oră plecare) | Should | 2 | 2 | 2 | 2 | 2 | 2 | **2** | Filtre client-side și server-side adăugate la căutarea din US-04. |
| 16 | **US-15** | Notificări schimbare status rezervare | Should | 5 | 5 | 5 | 5 | 5 | 5 | **5** | Mecanism asincron de trigger email/in-app la evenimentele de accept/reject/cancel. |
| 17 | **US-16** | Blocare conturi abuzive (Admin) | Should | 3 | 3 | 3 | 3 | 3 | 3 | **3** | Roluri de admin, middleware de protecție a rutelor, revocare token-uri sesiune. |
| 18 | **US-17** | Vizualizare listă sesizări (Admin) | Could | 3 | 2 | 3 | 3 | 3 | 3 | **3** | Pagină de moderare pentru tichetele raportate de studenți. |
| 19 | **US-18** | Raportare utilizator / comportament abuziv | Could | 2 | 2 | 2 | 2 | 2 | 2 | **2** | Formular și endpoint de creare sesizare cu motiv și dovadă text. |
| 20 | **US-19** | Publicare curse recurente | Could | 5 | 5 | 8 | 5 | 5 | 5 | **5** | Complexitate de generare instanțe pe calendar (săptămânal/zilnic). |
| 21 | **US-20** | Calcul și afișare CO₂ economisit | Could | 2 | 2 | 2 | 2 | 2 | 2 | **2** | Formulă simplă de conversie pe kilometru parcurs raportat la numărul de pasageri. |
| 22 | **US-21** | Resetare parolă prin email | Could | 3 | 3 | 3 | 3 | 3 | 3 | **3** | Generare token unic expirat în 1h, flux trimitere email și actualizare hash parolă. |

---

## 3. Scenarii Detaliate de Dezbatere Tehnică

### Scenariul 1: US-01 – Înregistrare cu email universitar
* **Participanți & Voturi Runda 1:**
  - Andrei: **2 SP**
  - Cosmin (PO): A susținut complexitatea ridicată, propunând efort echivalent de **5 SP**
  - Daniel: **5 SP**
  - Victor: **3 SP**
* **Argument Andrei (2 SP):**
  > „Formularul de register există deja în baseline-ul UrbanFlow cu biblioteca `better-auth`. Nu avem de făcut decât să adăugăm un `.regex()` în schema Zod pentru validarea formatului de email.”
* **Contraargument Cosmin & Daniel (5 SP):**
  > „US-01 reprezintă propunerea noastră centrală de inovare și bariera de securitate a comunității. O simplă verificare client-side în Zod este complet insuficientă: trebuie să menținem o listă configurabilă de domenii universitare acreditate (ex. `@s.unibuc.ro`, `@stud.acs.upb.ro`, etc.), să blocăm domenii spoofate (`evil-unibuc.ro`) și să integrăm verificarea pe server (`auth.ts` în hook-ul `before.create`). În plus, trebuie tratat fluxul de confirmare prin email pentru activarea contului.”
* **Consens Runda 2:** 
  - Andrei a înțeles necesitatea testării riguroase a cazurilor limită pe server și securizării la nivel de domeniu.
  - **Estimare agreată: 5 SP.**

---

### Scenariul 2: US-05 – Rezervare loc (pasager)
* **Participanți & Voturi Runda 1:**
  - Daniel: **8 SP**
  - Cosmin (PO): Sugera inițial **3 SP** considerând că este doar un simplu insert în tabela de rezervări
  - Andrei: **5 SP**
  - Victor: **5 SP**
* **Argument Daniel (8 SP):**
  > „Rezervarea este cea mai critică operațiune din sistem. Dacă doi pasageri încearcă simultan să rezerve ultimul loc disponibil al unei curse, riscăm o stare de concurență (race condition) ce duce la overbooking. Fără o tranzacție cu blocare pesimistă (`SELECT ... FOR UPDATE`) sau fără o decuplare precisă a stării în domeniul de business, vom genera date corupte în baza de date.”
* **Contraargument Andrei & Victor (5 SP):**
  > „Complexitatea tranzacțională a bazei de date poate fi ținută sub control dacă izolăm logica pură în `src/lib/domain/booking.ts`. Funcția `bookSeat` primește starea cursei, aplică verificările de business în mod imutabil (locuri libere, ne-repetare pasager, șofer != pasager) și returnează starea actualizată. Putem acoperi logica 100% cu teste unitare Vitest fără a avea nevoie de Docker/Postgres în prima fază, iar în endpoint adăugăm constrângerea de unicitate sau tranzacția. 8 SP este prea mult pentru o echipă care aplică TDD.”
* **Consens Runda 2:**
  - Daniel a acceptat abordarea de a decupla logica de domeniu pur de persistența DB, ceea ce reduce riscul și efortul de testare imediată.
  - **Estimare agreată: 5 SP.**

---

### Scenariul 3: US-07 – Anulare rezervare (pasager)
* **Participanți & Voturi Runda 1:**
  - Victor: **1 SP**
  - Andrei: **2 SP**
  - Daniel: **3 SP**
* **Argument Victor (1 SP):**
  > „Este un task trivial: facem doar un update pe câmpul status al rezervării, setându-l pe `cancelled`.”
* **Contraargument Daniel (3 SP):**
  > „Nu este doar o simplă schimbare de flag. Trebuie implementate și testate trei reguli stricte de business:
  > 1. Anularea este permisă **strict înainte** de ora de plecare a cursei (`departureAt > now`); după plecare, anularea trebuie refuzată categoric.
  > 2. Re-calcularea și eliberarea imediată a locului în cursă, astfel încât cursa să redevină căutabilă pentru alți pasageri.
  > 3. Permisiunea ca un pasager care a anulat anterior să poată re-rezerva ulterior dacă se răzgândește (tratarea corectă a rezervărilor active vs inactive).
  > Aceste ramificații logice necesită teste unitare TDD dedicate și tratare de erori specifice (`BOOKING_NOT_FOUND`, `RIDE_DEPARTED`).”
* **Consens Runda 2:**
  - Victor și Andrei au fost de acord că regulile de eliberare a locului și validarea orei de plecare ridică efortul de la un task banal (1 SP) la o complexitate medie (3 SP).
  - **Estimare agreată: 3 SP.**
