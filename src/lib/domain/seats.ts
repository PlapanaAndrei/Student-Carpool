import type { Ride } from './types';

export function freeSeats(ride: Ride): number {
	const taken = ride.bookings.filter((b) => b.status === 'pending' || b.status === 'accepted');
	return ride.totalSeats - taken.length;
}
