import type { Ride } from './types';

/** O rezervare "pending" sau "accepted" ocupa un loc. "rejected"/"cancelled" il elibereaza. */
export function freeSeats(ride: Ride): number {
	const taken = ride.bookings.filter((b) => b.status === 'pending' || b.status === 'accepted');
	return ride.totalSeats - taken.length;
}
