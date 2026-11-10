import { describe, expect, test } from 'vitest';
import { bookSeat, cancelBooking } from '../src/lib/domain/booking';
import { freeSeats } from '../src/lib/domain/seats';
import type { Ride } from '../src/lib/domain/types';

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

describe('bookSeat', () => {
	test('decrements free seats and creates a pending booking', () => {
		const updated = bookSeat(makeRide(), 'p1', now);
		expect(freeSeats(updated)).toBe(1);
		expect(updated.bookings).toEqual([{ passengerId: 'p1', status: 'pending' }]);
	});

	test('preserves immutability of original ride instance', () => {
		const ride = makeRide();
		bookSeat(ride, 'p1', now);
		expect(ride.bookings).toHaveLength(0);
	});

	test('rejects booking when no free seats are available', () => {
		const full = makeRide({ totalSeats: 1, bookings: [{ passengerId: 'a', status: 'accepted' }] });
		expect(codeOf(() => bookSeat(full, 'p1', now))).toBe('RIDE_FULL');
	});

	test('rejects duplicate booking from the same passenger', () => {
		const ride = makeRide({ bookings: [{ passengerId: 'p1', status: 'pending' }] });
		expect(codeOf(() => bookSeat(ride, 'p1', now))).toBe('ALREADY_BOOKED');
	});

	test('prevents drivers from booking their own ride', () => {
		expect(codeOf(() => bookSeat(makeRide(), 'driver', now))).toBe('DRIVER_CANNOT_BOOK');
	});

	test('rejects bookings for cancelled or departed rides', () => {
		expect(codeOf(() => bookSeat(makeRide({ status: 'cancelled' }), 'p1', now))).toBe('RIDE_NOT_OPEN');
		const later = new Date('2030-01-03T00:00:00');
		expect(codeOf(() => bookSeat(makeRide(), 'p1', later))).toBe('RIDE_DEPARTED');
	});

	test('allows passenger to re-book after prior booking was cancelled', () => {
		const ride = makeRide({ bookings: [{ passengerId: 'p1', status: 'cancelled' }] });
		expect(freeSeats(bookSeat(ride, 'p1', now))).toBe(1);
	});
});

describe('cancelBooking', () => {
	test('cancels active booking and restores available seat count', () => {
		const ride = makeRide({ bookings: [{ passengerId: 'p1', status: 'accepted' }] });
		const updated = cancelBooking(ride, 'p1', now);
		expect(freeSeats(updated)).toBe(2);
		expect(updated.bookings[0].status).toBe('cancelled');
	});

	test('supports cancelling pending requests', () => {
		const ride = makeRide({ bookings: [{ passengerId: 'p1', status: 'pending' }] });
		expect(cancelBooking(ride, 'p1', now).bookings[0].status).toBe('cancelled');
	});

	test('throws when cancelling non-existent or already cancelled booking', () => {
		expect(codeOf(() => cancelBooking(makeRide(), 'p1', now))).toBe('BOOKING_NOT_FOUND');
		const ride = makeRide({ bookings: [{ passengerId: 'p1', status: 'cancelled' }] });
		expect(codeOf(() => cancelBooking(ride, 'p1', now))).toBe('BOOKING_NOT_FOUND');
	});

	test('disallows cancellation after departure time', () => {
		const ride = makeRide({ bookings: [{ passengerId: 'p1', status: 'accepted' }] });
		expect(codeOf(() => cancelBooking(ride, 'p1', new Date('2030-01-03T00:00:00')))).toBe('RIDE_DEPARTED');
	});

	test('cancels only the target passenger booking without affecting others', () => {
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
