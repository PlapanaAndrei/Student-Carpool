import { describe, expect, test } from 'vitest';
import { bookSeat, cancelBooking, freeSeats, DomainError, type Ride } from '../src/lib/domain/booking';

function codeOf(fn: () => unknown): string | undefined {
	try {
		fn();
	} catch (e) {
		return (e as { code?: string }).code;
	}
}

const now = new Date('2030-01-01T08:00:00');
function makeRide(over: Partial<Ride> = {}): Ride {
	return {
		id: 'r1',
		driverId: 'driver',
		origin: 'București',
		destination: 'Brașov',
		departureAt: new Date('2030-01-02T10:00:00'),
		totalSeats: 2,
		pricePerSeat: 40,
		status: 'open',
		bookings: [],
		...over
	};
}

describe('bookSeat (US-05)', () => {
	test('US-05: Rezervarea scade locurile libere cu 1 și creează cerere "pending"', () => {
		const updated = bookSeat(makeRide(), 'p1', now);
		expect(freeSeats(updated)).toBe(1);
		expect(updated.bookings).toEqual([{ passengerId: 'p1', status: 'pending' }]);
	});

	test('nu modifica cursa originala (imutabilitate)', () => {
		const ride = makeRide();
		bookSeat(ride, 'p1', now);
		expect(ride.bookings).toHaveLength(0);
	});

	test('US-05: Aruncă eroare la rezervare în cursă cu 0 locuri (cursa plina)', () => {
		const full = makeRide({ totalSeats: 1, bookings: [{ passengerId: 'a', status: 'accepted' }] });
		expect(codeOf(() => bookSeat(full, 'p1', now))).toBe('RIDE_FULL');
	});

	test('rezervare dubla respinsa', () => {
		const ride = makeRide({ bookings: [{ passengerId: 'p1', status: 'pending' }] });
		expect(codeOf(() => bookSeat(ride, 'p1', now))).toBe('ALREADY_BOOKED');
	});

	test('US-05: Aruncă eroare dacă pasagerul este șoferul cursei', () => {
		expect(codeOf(() => bookSeat(makeRide(), 'driver', now))).toBe('DRIVER_CANNOT_BOOK');
	});

	test('cursa anulata sau deja plecata nu mai accepta rezervari', () => {
		expect(codeOf(() => bookSeat(makeRide({ status: 'cancelled' }), 'p1', now))).toBe('RIDE_NOT_OPEN');
		const later = new Date('2030-01-03T00:00:00');
		expect(codeOf(() => bookSeat(makeRide(), 'p1', later))).toBe('RIDE_DEPARTED');
	});

	test('dupa anulare, pasagerul poate rezerva din nou', () => {
		const ride = makeRide({ bookings: [{ passengerId: 'p1', status: 'cancelled' }] });
		expect(freeSeats(bookSeat(ride, 'p1', now))).toBe(1);
	});
});

describe('cancelBooking (US-07)', () => {
	test('US-07: Anularea (înainte de plecare) schimbă statusul în "cancelled" și eliberează locul', () => {
		const ride = makeRide({ bookings: [{ passengerId: 'p1', status: 'accepted' }] });
		const updated = cancelBooking(ride, 'p1', now);
		expect(freeSeats(updated)).toBe(2);
		expect(updated.bookings[0].status).toBe('cancelled');
	});

	test('merge si pentru cerere in asteptare', () => {
		const ride = makeRide({ bookings: [{ passengerId: 'p1', status: 'pending' }] });
		expect(cancelBooking(ride, 'p1', now).bookings[0].status).toBe('cancelled');
	});

	test('nu poti anula o rezervare inexistenta sau deja anulata', () => {
		expect(codeOf(() => cancelBooking(makeRide(), 'p1', now))).toBe('BOOKING_NOT_FOUND');
		const ride = makeRide({ bookings: [{ passengerId: 'p1', status: 'cancelled' }] });
		expect(codeOf(() => cancelBooking(ride, 'p1', now))).toBe('BOOKING_NOT_FOUND');
	});

	test('nu se poate anula dupa plecare', () => {
		const ride = makeRide({ bookings: [{ passengerId: 'p1', status: 'accepted' }] });
		expect(codeOf(() => cancelBooking(ride, 'p1', new Date('2030-01-03T00:00:00')))).toBe('RIDE_DEPARTED');
	});

	test('anuleaza doar rezervarea pasagerului, nu pe ale altora', () => {
		const ride = makeRide({
			bookings: [
				{ passengerId: 'p1', status: 'accepted' },
				{ passengerId: 'p2', status: 'accepted' }
			]
		});
		const updated = cancelBooking(ride, 'p1', now);
		expect(updated.bookings.find((b) => b.passengerId === 'p2')?.status).toBe('accepted');
	});
});
