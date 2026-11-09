import { DomainError, type Ride } from './types';

export type Decision = 'accept' | 'reject';

export function respondToBooking(
	ride: Ride,
	actingUserId: string,
	passengerId: string,
	decision: Decision
): Ride {
	if (actingUserId !== ride.driverId) {
		throw new DomainError('NOT_DRIVER', 'Doar șoferul cursei poate răspunde cererilor de rezervare');
	}

	const target = ride.bookings.find(
		(b) => b.passengerId === passengerId && b.status === 'pending'
	);
	if (!target) {
		throw new DomainError('PENDING_BOOKING_NOT_FOUND', 'Nu există o cerere în așteptare pentru acest pasager');
	}

	const status = decision === 'accept' ? 'accepted' : 'rejected';
	return {
		...ride,
		bookings: ride.bookings.map((b) => (b === target ? { ...b, status } : b))
	};
}
