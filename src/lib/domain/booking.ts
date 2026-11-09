import { freeSeats } from './seats';
import { DomainError, type BookingStatus, type Ride } from './types';

const isBookingActive = (status: BookingStatus) =>
	status === 'pending' || status === 'accepted';

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
	if (ride.bookings.some((b) => b.passengerId === passengerId && isBookingActive(b.status))) {
		throw new DomainError('ALREADY_BOOKED', 'Pasagerul are deja o rezervare activă');
	}
	if (freeSeats(ride) <= 0) {
		throw new DomainError('RIDE_FULL', 'Nu mai sunt locuri libere');
	}

	return {
		...ride,
		bookings: [...ride.bookings, { passengerId, status: 'pending' }]
	};
}

export function cancelBooking(ride: Ride, passengerId: string, now: Date = new Date()): Ride {
	const target = ride.bookings.find(
		(b) => b.passengerId === passengerId && isBookingActive(b.status)
	);
	if (!target) {
		throw new DomainError('BOOKING_NOT_FOUND', 'Nu a fost găsită o rezervare activă');
	}
	if (ride.departureAt.getTime() <= now.getTime()) {
		throw new DomainError('RIDE_DEPARTED', 'Nu se mai poate anula rezervarea după ora plecării');
	}

	return {
		...ride,
		bookings: ride.bookings.map((b) =>
			b === target ? { ...b, status: 'cancelled' } : b
		)
	};
}
