# Sesiune de Planning Poker – StudentCarpool

**Data:** 4 noiembrie 2026  
**Participanți:** 
- Cosmin (Product Owner – prezentare cerințe, fără vot)
- Victor (Dezvoltator – votant)
- Andrei (Dezvoltator – votant)
- Daniel (Dezvoltator – votant)

**Cărți folosite:** Șirul Fibonacci (1, 2, 3, 5, 8, 13)  
**Story de referință:** **US-02 (Autentificare și deconectare) = 2 SP** (flux de bază cu risc minim, folosit ca reper pentru restul poveștilor).

---

## 1. Desfășurare și Rezultate Vot (22 User Stories)

| ID | User Story | Victor R1 | Andrei R1 | Daniel R1 | Victor R2 | Andrei R2 | Daniel R2 | Punctaj Final | Argument tehnic |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **US-01** | Înregistrare cu email universitar | 3 | 2 | 5 | 5 | 5 | 5 | **5 SP** | Whitelist domenii universitare pe server, protecție spoofing, verificare token. |
| **US-02** | Autentificare și deconectare | 2 | 2 | 2 | 2 | 2 | 2 | **2 SP** | Story de referință; adaptare formular și cookie de sesiune HTTP-only. |
| **US-03** | Publicare cursă (șofer) | 3 | 5 | 5 | 5 | 5 | 5 | **5 SP** | Validări: dată în viitor, orașe diferite, locuri între 1 și 8, preț pozitiv. |
| **US-04** | Căutare curse după oraș și dată | 2 | 3 | 5 | 3 | 3 | 3 | **3 SP** | Filtrare traseu/dată, tratare diacritice, excludere curse fără locuri libere. |
| **US-05** | Rezervare loc (pasager) | 5 | 5 | 8 | 5 | 5 | 5 | **5 SP** | Gestiune concurență pe ultimul loc, status intermediar PENDING, validare șofer != pasager. |
| **US-06** | Decizie cerere rezervare (șofer) | 3 | 3 | 5 | 3 | 3 | 3 | **3 SP** | Verificare drepturi șofer, tranziție status (ACCEPTED/REJECTED), eliberare loc la respingere. |
| **US-07** | Anulare rezervare (pasager) | 1 | 2 | 3 | 3 | 3 | 3 | **3 SP** | Permisă doar înainte de plecare, eliberare loc în cursă și păstrare istoric. |
| **US-08a** | Dashboard șofer (curse și cereri) | 5 | 3 | 3 | 3 | 3 | 3 | **3 SP** | Filtrare după driverId, listare cereri primite și pasageri confirmați. |
| **US-08b** | Dashboard pasager (rezervările mele) | 2 | 3 | 2 | 2 | 2 | 2 | **2 SP** | Listare rezervări proprii și afișare status curent. |
| **US-09** | Editare / Anulare cursă publicată | 3 | 5 | 3 | 3 | 3 | 3 | **3 SP** | Trecere cursă în status cancelled, blocare rezervări noi, notificare pasageri. |
| **US-10** | Editare profil utilizator | 2 | 2 | 2 | 2 | 2 | 2 | **2 SP** | Formular clasic de actualizare nume, telefon și facultate. |
| **US-11** | Calcul cost per pasager | 1 | 2 | 2 | 2 | 2 | 2 | **2 SP** | Împărțire preț total la numărul pasagerilor confirmați. |
| **US-12** | Acordare rating după cursă | 3 | 3 | 5 | 3 | 3 | 3 | **3 SP** | Permis doar pasagerilor confirmați după finalizarea cursei (notă 1-5 + text). |
| **US-13** | Afișare rating mediu șofer | 2 | 2 | 3 | 2 | 2 | 2 | **2 SP** | Calcul medie note și afișare badge pe profil și curse. |
| **US-14** | Filtrare avansată curse | 2 | 3 | 2 | 2 | 2 | 2 | **2 SP** | Filtrare suplimentară pe interval orar și preț maxim. |
| **US-15** | Notificări schimbare status | 3 | 5 | 8 | 5 | 5 | 5 | **5 SP** | Tabela de notificări persistente și badge necitite în UI (fără WebSockets în MVP). |
| **US-16** | Blocare conturi abuzive (Admin) | 3 | 3 | 3 | 3 | 3 | 3 | **3 SP** | Flag isBanned în baza de date, invalidare automată a sesiunii din middleware. |
| **US-17** | Vizualizare sesizări (Admin) | 3 | 2 | 3 | 3 | 3 | 3 | **3 SP** | Panou centralizat pentru gestionarea incidentelor raportate. |
| **US-18** | Raportare utilizator / incident | 2 | 2 | 2 | 2 | 2 | 2 | **2 SP** | Formular de sesizare asociat unei curse terminate. |
| **US-19** | Publicare curse recurente | 5 | 5 | 8 | 5 | 5 | 5 | **5 SP** | Generare automată curse săptămânale după un șablon de calendar. |
| **US-20** | Calcul CO₂ economisit | 1 | 2 | 2 | 2 | 2 | 2 | **2 SP** | Formulă matematică bazată pe kilometraj parcurs și număr de ocupanți. |
| **US-21** | Resetare parolă prin email | 3 | 5 | 3 | 3 | 3 | 3 | **3 SP** | Token unic temporar cu expirare la 15 minute trimis pe email. |

---

## 2. Dezbateri Tehnice și Decizii de Consens

### US-01: Înregistrare cu email universitar (Voturi R1: 2, 3, 5 → Consens: 5 SP)
- **Divergență:** Andrei a votat 2 crezând că e suficient un regex pe inputul din frontend. Daniel a votat 5 demonstrând riscul de securitate: este necesar un whitelist pe server (`@s.unibuc.ro`, `@stud.acs.upb.ro`), blocarea domeniilor malițioase spoofate și flux de verificare cu token.
- **Decizie:** Fiind bariera principală de acces a platformei, s-a convenit că testarea și securizarea server-side justifică **5 SP**.

### US-05: Rezervare loc (Voturi R1: 5, 5, 8 → Consens: 5 SP)
- **Divergență:** Daniel a votat 8 din cauza riscului de concurență (race condition când doi pasageri încearcă simultan rezervarea ultimului loc). Andrei și Victor au propus rezolvarea concurenței prin tranzacție atomică în baza de date (`UPDATE ... WHERE free_seats > 0`), lăsând logica de domeniu pură și ușor de testat unitar în Vitest.
- **Decizie:** Decuplarea logicii pure de persistență a redus complexitatea la **5 SP**.

### US-07: Anulare rezervare (Voturi R1: 1, 2, 3 → Consens: 3 SP)
- **Divergență:** Victor a votat 1 considerând că e un simplu update de status. Daniel a arătat că sunt necesare 3 reguli stricte: anularea permisă doar înainte de plecarea cursei, eliberarea imediată a locului pentru alți căutători și păstrarea istoricului (soft cancel).
- **Decizie:** Ramificațiile logice și tratarea erorilor de domeniu au stabilit punctajul la **3 SP**.

### US-08: Împărțire Story (Voturi R1: 5, 8, 8 → Descompus în US-08a și US-08b)
- **Divergență:** Cerința inițială „Dashboard utilizator” amesteca perspectiva șoferului (curse create + cereri primite de aprobat) cu cea a pasagerului (istoric rezervări). Votat la 8 SP, era prea mare pentru a intra curat într-un sprint.
- **Decizie:** S-a aplicat Story Splitting în două cerințe independente:
  - **US-08a** (Dashboard Șofer: gestionare curse și solicitări) = **3 SP**
  - **US-08b** (Dashboard Pasager: vizualizare rezervări proprii) = **2 SP**

### US-15: Notificări schimbare status (Voturi R1: 3, 5, 8 → Consens: 5 SP)
- **Divergență:** Daniel a votat 8 gândindu-se la WebSockets în timp real și push notifications mobile. Cosmin (PO) a clarificat că pentru MVP este necesar doar un inbox intern de mesaje cu badge de necitite. Andrei a urcat de la 3 la 5 SP pentru tabela dedicată și endpoint-ul de citire.
- **Decizie:** Cu limitarea clară a funcționalității la stocare internă persistentă, s-a agreat **5 SP**.

---

## 3. Selecție pentru Sprint 1

- **Capacitate echipă:** 3 dezvoltatori × ~10 SP/săptămână = **~30 SP**.
- **User Stories selectate în Sprint 1 (Must Have):** US-01 (5), US-02 (2), US-03 (5), US-04 (3), US-05 (5), US-06 (3), US-07 (3), US-08a/b (5).
- **Total puncte asumate:** **31 SP** (Victor ~10 SP, Andrei ~10 SP, Daniel ~11 SP).
