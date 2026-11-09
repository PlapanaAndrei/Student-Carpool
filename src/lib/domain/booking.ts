import { freeSeats } from './seats';
import { DomainError, type Ride } from './types';

export { DomainError, freeSeats, type Ride };

const isActive = (status: string) => status === 'pending' || status === 'accepted';

/**
 * US-05: Pasagerul cere un loc. Cererea rămâne "pending" până când răspunde șoferul (US-06).
 * Scade numărul de locuri libere și păstrează imutabilitatea cursei.
 */
export function bookSeat(ride: Ride, passengerId: string, now: Date = new Date()): Ride {
	if (ride.status !== 'open') {
		throw new DomainError('RIDE_NOT_OPEN', 'Cursa nu este deschisă pentru rezervări');
	}
	if (ride.departureAt.getTime() <= now.getTime()) {
		throw new DomainError('RIDE_DEPARTED', 'Cursa a plecat deja');
	}
	if (passengerId === ride.driverId) {
		throw new DomainError('DRIVER_CANNOT_BOOK', 'Șoferul nu își poate rezerva propria cursă');
	}
	if (ride.bookings.some((b) => b.passengerId === passengerId && isActive(b.status))) {
		throw new DomainError('ALREADY_BOOKED', 'Pasagerul are deja o rezervare activă pentru această cursă');
	}
	if (freeSeats(ride) <= 0) {
		throw new DomainError('RIDE_FULL', 'Nu mai sunt locuri libere');
	}

	return {
		...ride,
		bookings: [...ride.bookings, { passengerId, status: 'pending' }]
	};
}

/**
 * US-07: Pasagerul își anulează rezervarea activă înainte de plecare; locul se eliberează.
 */
export function cancelBooking(ride: Ride, passengerId: string, now: Date = new Date()): Ride {
	const target = ride.bookings.find((b) => b.passengerId === passengerId && isActive(b.status));
	if (!target) {
		throw new DomainError('BOOKING_NOT_FOUND', 'Nu a fost găsită o rezervare activă');
	}
	if (ride.departureAt.getTime() <= now.getTime()) {
		throw new DomainError('RIDE_DEPARTED', 'Nu se mai poate anula rezervarea după ora plecării');
	}

	return {
		...ride,
		bookings: ride.bookings.map((b) => (b === target ? { ...b, status: 'cancelled' as const } : b))
	};
}
