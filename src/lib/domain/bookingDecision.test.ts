import { describe, expect, test } from 'vitest';
import { respondToBooking } from './bookingDecision';
import { freeSeats } from './seats';
import type { Ride } from './types';

function codeOf(fn: () => unknown): string | undefined {
	try {
		fn();
	} catch (e) {
		return (e as { code?: string }).code;
	}
}

const ride: Ride = {
	id: 'r1',
	driverId: 'driver',
	origin: 'A',
	destination: 'B',
	departureAt: new Date('2030-01-01T10:00:00'),
	totalSeats: 2,
	pricePerSeat: 10,
	status: 'open',
	bookings: [
		{ passengerId: 'p1', status: 'pending' },
		{ passengerId: 'p2', status: 'accepted' }
	]
};

describe('respondToBooking', () => {
	test('driver accepts a pending booking request', () => {
		const updated = respondToBooking(ride, 'driver', 'p1', 'accept');
		expect(updated.bookings.find((b) => b.passengerId === 'p1')?.status).toBe('accepted');
	});

	test('rejecting a request restores available seat count', () => {
		expect(freeSeats(ride)).toBe(0);
		const updated = respondToBooking(ride, 'driver', 'p1', 'reject');
		expect(freeSeats(updated)).toBe(1);
	});

	test('preserves immutability of original ride instance', () => {
		respondToBooking(ride, 'driver', 'p1', 'accept');
		expect(ride.bookings[0].status).toBe('pending');
	});

	test('authorizes only the assigned driver to respond', () => {
		expect(codeOf(() => respondToBooking(ride, 'p2', 'p1', 'accept'))).toBe('NOT_DRIVER');
	});

	test('requires booking request to be in pending state', () => {
		expect(codeOf(() => respondToBooking(ride, 'driver', 'p2', 'accept'))).toBe(
			'PENDING_BOOKING_NOT_FOUND'
		);
		expect(codeOf(() => respondToBooking(ride, 'driver', 'nobody', 'reject'))).toBe(
			'PENDING_BOOKING_NOT_FOUND'
		);
	});
});
