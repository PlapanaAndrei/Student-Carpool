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
	test('șoferul acceptă o cerere de rezervare', () => {
		const updated = respondToBooking(ride, 'driver', 'p1', 'accept');
		expect(updated.bookings.find((b) => b.passengerId === 'p1')?.status).toBe('accepted');
	});

	test('respingerea unei cereri eliberează locul ocupat', () => {
		expect(freeSeats(ride)).toBe(0);
		const updated = respondToBooking(ride, 'driver', 'p1', 'reject');
		expect(freeSeats(updated)).toBe(1);
	});

	test('nu modifică obiectul original', () => {
		respondToBooking(ride, 'driver', 'p1', 'accept');
		expect(ride.bookings[0].status).toBe('pending');
	});

	test('doar șoferul cursei are permisiunea să răspundă cererilor', () => {
		expect(codeOf(() => respondToBooking(ride, 'p2', 'p1', 'accept'))).toBe('NOT_DRIVER');
	});

	test('cererea trebuie să fie în starea pending', () => {
		expect(codeOf(() => respondToBooking(ride, 'driver', 'p2', 'accept'))).toBe(
			'PENDING_BOOKING_NOT_FOUND'
		);
		expect(codeOf(() => respondToBooking(ride, 'driver', 'nobody', 'reject'))).toBe(
			'PENDING_BOOKING_NOT_FOUND'
		);
	});
});
