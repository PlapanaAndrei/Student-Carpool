# Test Cases Documentate – StudentCarpool

Acest document descrie cazurile de testare derivate din criteriile de acceptare, acoperirea automată (Vitest) și rezultatele execuției pentru validarea de acceptanță.

| ID | Story | Acțiune / Scenariu | Date de Intrare | Rezultat Așteptat | Tip Test | Executat de / Dată / Rezultat |
|---|---|---|---|---|---|---|
| **TC-01** | US-01 | Înregistrare cont nou | `ion@s.unibuc.ro` | Cont creat cu succes | Automat + Manual | Victor / În așteptare |
| **TC-02** | US-01 | Înregistrare domeniu public | `ion@gmail.com` | Refuzat cu eroare | Automat + Manual | Victor / În așteptare |
| **TC-03** | US-01 | Înregistrare domeniu spoofing | `ion@evil-unibuc.ro` | Refuzat | Automat | Victor / În așteptare |
| **TC-04** | US-02 | Autentificare reușită | Credențiale valide | Sesiune creată, redirect dashboard | Manual | Victor + Daniel / În așteptare |
| **TC-05** | US-02 | Autentificare parolă greșită | Parolă incorectă | Mesaj generic de eroare | Manual | Victor + Daniel / În așteptare |
| **TC-06** | US-02 | Deconectare | Sesiune activă | Token invalidat, acces refuzat | Manual | Victor + Daniel / În așteptare |
| **TC-07** | US-03 | Publicare cursă validă | Puncte plecare/sosire, locuri 1-8 | Cursă salvată ca `open` | Automat + Manual | Andrei / În așteptare |
| **TC-08** | US-03 | Dată plecare în trecut | Dată anterioară momentului curent | `DEPARTURE_IN_PAST` | Automat | Andrei / În așteptare |
| **TC-09** | US-03 | Locuri în afara limitelor | `totalSeats = 0` sau `totalSeats > 8` | `SEATS_OUT_OF_RANGE` | Automat | Andrei / În așteptare |
| **TC-10** | US-03 | Origine identică cu destinația | `origin === destination` | `SAME_ORIGIN_DESTINATION` | Automat | Andrei / În așteptare |
| **TC-11** | US-04 | Căutare București → Brașov | Filtru dată | Returnează doar curse `open` sortate | Automat + Manual | Andrei / În așteptare |
| **TC-12** | US-04 | Căutare fără rezultate | Dată fără curse | Listă goală | Manual | Andrei / În așteptare |
| **TC-13** | **US-05** | Rezervare cursă cu locuri | Pasager `p1`, cursă cu 2 locuri | Locuri libere devin 1; cerere `pending` | **Automat (Vitest)** | **Daniel / 09.11.2026 / PASS** |
| **TC-14** | **US-05** | Rezervare cursă fără locuri | Cursă cu 0 locuri libere | Aruncă `RIDE_FULL` | **Automat (Vitest)** | **Daniel / 09.11.2026 / PASS** |
| **TC-15** | **US-05** | Rezervare dublă pasager | Cerere `pending` deja existentă | Aruncă `ALREADY_BOOKED` | **Automat (Vitest)** | **Daniel / 09.11.2026 / PASS** |
| **TC-16** | **US-05** | Șoferul rezervă propria cursă | `passengerId === driverId` | Aruncă `DRIVER_CANNOT_BOOK` | **Automat (Vitest)** | **Daniel / 09.11.2026 / PASS** |
| **TC-17** | **US-07** | Anulare rezervare activă | Pasager cu cerere înainte de cursă | Status `cancelled`; loc re-eliberat | **Automat (Vitest)** | **Daniel / 09.11.2026 / PASS** |
| **TC-18** | **US-07** | Anulare după ora plecării | `now >= departureAt` | Aruncă `RIDE_DEPARTED` | **Automat (Vitest)** | **Daniel / 09.11.2026 / PASS** |
| **TC-19** | **US-06** | Șofer acceptă / respinge cerere | Decizie `accept` sau `reject` | Status devine `accepted` / `rejected` | **Automat (Vitest)** | **Daniel / 09.11.2026 / PASS** |
| **TC-20** | **US-06** | Decizie luată de non-șofer | `actingUserId !== driverId` | Aruncă `NOT_DRIVER` | **Automat (Vitest)** | **Daniel / 09.11.2026 / PASS** |
| **TC-21** | US-08 | Dashboard utilizator | Căutare date proprii | Filtrare strictă după ID sesiune | Manual | Victor / În așteptare |
| **TC-22** | US-11 | Împărțire cost | Cursă 180 km, consum 7l/100km | Cost calculat corect per pasager | Automat | Backlog |
