# Planning Poker – Estimare Product Backlog (StudentCarpool)

## 1. Metodologie și Scală de Estimare

Planning Poker este o tehnică agilă de estimare relativă, bazată pe consens, utilizată de echipă pentru a dimensiona efortul, complexitatea și incertitudinea User Story-urilor. În loc de ore calendaristice (care variază în funcție de experiența individuală), efortul este exprimat în **Story Points (SP)**.

### Șirul Fibonacci (1, 2, 3, 5, 8, 13, 21)
Folosim secvența Fibonacci deoarece distanța dintre valori crește proporțional cu mărimea sarcinii. Pe măsură ce o cerință este mai amplă, gradul de incertitudine crește, iar o granularitate prea fină devine artificială (este relevant să dezbatem între 2 și 3 puncte, dar între 11 și 12 puncte incertitudinea este aceeași, motiv pentru care se trece la 13).

### Cadrul sesiunii de estimare:
1. **Roluri:**
   - **Cosmin (Product Owner):** Prezintă fiecare User Story, clarifică cerințele funcționale și criteriile de acceptare (Given-When-Then). Nu votează.
   - **Victor (Scrum Master & Dev), Andrei (Dev), Daniel (Dev):** Dezvoltatorii responsabili de implementare și testare; fiecare selectează individual o valoare SP.
2. **Vot simultan:** Toți dezvoltatorii își dezvăluie opțiunile în același timp pentru a evita influențarea votului.
3. **Dezbatere tehnică:** Dacă există divergențe semnificative (de exemplu 2 vs 5 sau 3 vs 8), dezvoltatorii cu valorile extreme își argumentează opțiunile (riscuri arhitecturale, dependențe, cazuri limită).
4. **Consens (Runda 2):** Se revotează pe baza argumentelor până la alinierea echipei.
5. **Story Etalon:** A fost stabilit **US-02 (Autentificare/Deconectare)** la **2 SP**, întrucât mecanismele de sesiune existau deja parțial în structura de bază a proiectului.

---

## 2. Tabel Estimare User Stories (22 User Stories)

| # | ID | User Story (Rezumat) | Prioritate | Victor R1 | Andrei R1 | Daniel R1 | Victor R2 | Andrei R2 | Daniel R2 | SP Final | Justificare tehnică / Decizie consens |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **US-01** | Înregistrare cu email universitar | Must | 3 | 2 | 5 | 5 | 5 | 5 | **5** | Validare domeniu whitelist, protecție împotriva spoofing-ului și verificare pe server. |
| 2 | **US-02** | Autentificare și deconectare | Must | 2 | 2 | 2 | 2 | 2 | 2 | **2** | Story etalon; infrastructura existentă, adaptare formulare și sesiune utilizator. |
| 3 | **US-03** | Publicare cursă (șofer) | Must | 5 | 3 | 5 | 5 | 5 | 5 | **5** | Validări multiple de domeniu (dată în viitor, orașe distincte, locuri 1-8, preț pozitiv). |
| 4 | **US-04** | Căutare curse după oraș și dată | Must | 3 | 3 | 3 | 3 | 3 | 3 | **3** | Normalizare diacritice, query cu filtrare după status deschis și locuri libere. |
| 5 | **US-05** | Rezervare loc (pasager) | Must | 5 | 5 | 8 | 5 | 5 | 5 | **5** | Gestiune concurență, verificare locuri disponibile și izolare domeniu de business. |
| 6 | **US-07** | Anulare rezervare (pasager) | Must | 1 | 2 | 3 | 3 | 3 | 3 | **3** | Verificare oră plecare (anulare doar înainte), actualizare status și eliberare loc. |
| 7 | **US-06** | Acceptare / Respingere cerere (șofer) | Must | 3 | 3 | 3 | 3 | 3 | 3 | **3** | Verificare drepturi (doar șoferul), tranziție status și eliberare loc la refuz. |
| 8 | **US-08a** | Dashboard șofer (cursele mele & cereri) | Must | 3 | 3 | 3 | 3 | 3 | 3 | **3** | Filtrare după `driverId`, agregare pasageri confirmați și solicitări în așteptare. |
| 9 | **US-08b** | Dashboard pasager (rezervările mele) | Must | 2 | 2 | 3 | 2 | 2 | 2 | **2** | Interogare rezervări asociate contului de pasager și afișare status curent. |
| 10 | **US-11** | Estimare cost per persoană | Should | 2 | 2 | 2 | 2 | 2 | 2 | **2** | Calcul algoritmic pur de împărțire a costului pe baza pasagerilor confirmați. |
| 11 | **US-09** | Editare / Anulare cursă publicată | Should | 3 | 3 | 3 | 3 | 3 | 3 | **3** | Modificare status cursă și invalidare/notificare rezervări asociate. |
| 12 | **US-10** | Editare profil utilizator | Should | 2 | 2 | 2 | 2 | 2 | 2 | **2** | Formular de actualizare date profil (nume, telefon, facultate). |
| 13 | **US-12** | Acordare rating după cursă | Should | 3 | 3 | 3 | 3 | 3 | 3 | **3** | Validare participare efectivă la cursă; interval note 1-5 și comentariu opțional. |
| 14 | **US-13** | Afișare rating mediu șofer | Should | 2 | 2 | 2 | 2 | 2 | 2 | **2** | Agregare scor mediu și număr recenzii la nivel de profil public. |
| 15 | **US-14** | Filtrare avansată (preț, oră plecare) | Should | 2 | 2 | 2 | 2 | 2 | 2 | **2** | Filtrare suplimentară client/server peste căutarea inițială. |
| 16 | **US-15** | Notificări schimbare status rezervare | Should | 5 | 5 | 5 | 5 | 5 | 5 | **5** | Mecanism de notificare la acceptarea, respingerea sau anularea rezervării. |
| 17 | **US-16** | Blocare conturi abuzive (Admin) | Should | 3 | 3 | 3 | 3 | 3 | 3 | **3** | Roluri de administrare, middleware de securitate și revocare token-uri. |
| 18 | **US-17** | Vizualizare listă sesizări (Admin) | Could | 3 | 2 | 3 | 3 | 3 | 3 | **3** | Panou centralizat pentru gestionarea incidentelor raportate. |
| 19 | **US-18** | Raportare utilizator / comportament abuziv | Could | 2 | 2 | 2 | 2 | 2 | 2 | **2** | Formular și endpoint de trimitere raportare cu detalii incident. |
| 20 | **US-19** | Publicare curse recurente | Could | 5 | 5 | 8 | 5 | 5 | 5 | **5** | Generare automată a instanțelor de cursă pe calendar recurent. |
| 21 | **US-20** | Calcul și afișare CO₂ economisit | Could | 2 | 2 | 2 | 2 | 2 | 2 | **2** | Estimare impact ecologic raportat la distanță și pasageri prezenți. |
| 22 | **US-21** | Resetare parolă prin email | Could | 3 | 3 | 3 | 3 | 3 | 3 | **3** | Generare token temporar unic și procedură de schimbare securizată. |

---

## 3. Scenarii de Dezbatere Tehnică

### Scenariul 1: US-01 – Înregistrare cu email universitar
* **Voturi Runda 1:** Andrei: 2 SP | Cosmin (PO): 5 SP | Daniel: 5 SP | Victor: 3 SP
* **Argument Andrei (2 SP):** Autentificarea de bază există deja în proiect; ar fi suficientă o validare regex simplă pe formular.
* **Argument Cosmin & Daniel (5 SP):** Este funcționalitatea critică de securitate și identitate a aplicației. Necesită verificare pe server, gestionarea unei liste configurabile de domenii autorizate (ex. `@s.unibuc.ro`, `@stud.acs.upb.ro`), respingerea domeniilor malițioase spoofate și fluxul de activare prin email.
* **Decizie Runda 2:** Echipa a convenit că testarea pe cazuri limită și securizarea server-side justifică complexitatea. **Agreat: 5 SP.**

---

### Scenariul 2: US-05 – Rezervare loc (pasager)
* **Voturi Runda 1:** Daniel: 8 SP | Cosmin (PO): 3 SP | Andrei: 5 SP | Victor: 5 SP
* **Argument Daniel (8 SP):** Există riscul apariției stărilor de concurență (race conditions) când doi pasageri încearcă simultan rezervarea ultimului loc disponibil, ceea ce ar putea produce overbooking.
* **Argument Andrei & Victor (5 SP):** Izolând logica pură în domeniu (`src/lib/domain/booking.ts`), starea se actualizează imutabil și se testează unitar complet prin Vitest fără dependențe externe. Nivelul de persistență poate gestiona concurența prin constrângeri tranzacționale clare.
* **Decizie Runda 2:** S-a agreat decuplarea logicii de domeniu de baza de date pentru a menține codul simplu și testabil. **Agreat: 5 SP.**

---

### Scenariul 3: US-07 – Anulare rezervare (pasager)
* **Voturi Runda 1:** Victor: 1 SP | Andrei: 2 SP | Daniel: 3 SP
* **Argument Victor (1 SP):** Pare o simplă schimbare a unui câmp în baza de date.
* **Argument Daniel (3 SP):** Operațiunea implică trei reguli de business stricte: validarea că anularea se face strict înainte de ora plecării, re-eliberarea imediată a locului în cursă și permisiunea ca un utilizator care a anulat să poată rezerva ulterior din nou.
* **Decizie Runda 2:** S-a agreat că ramificațiile logice și tratarea erorilor specifice (`BOOKING_NOT_FOUND`, `RIDE_DEPARTED`) justifică o complexitate medie. **Agreat: 3 SP.**
