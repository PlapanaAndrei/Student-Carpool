import { freeSeats } from './seats';
import { DomainError, type BookingStatus, type Ride } from './types';

const isBookingActive = (status: BookingStatus) =>
	status === 'pending' || status === 'accepted';

export function bookSeat(ride: Ride, passengerId: string, now: Date = new Date()): Ride {
	if (ride.status !== 'open') {
		throw new DomainError('RIDE_NOT_OPEN', 'Ride is not open for bookings');
	}
	if (ride.departureAt.getTime() <= now.getTime()) {
		throw new DomainError('RIDE_DEPARTED', 'Ride has already departed');
	}
	if (passengerId === ride.driverId) {
		throw new DomainError('DRIVER_CANNOT_BOOK', 'Driver cannot book their own ride');
	}
	if (ride.bookings.some((b) => b.passengerId === passengerId && isBookingActive(b.status))) {
		throw new DomainError('ALREADY_BOOKED', 'Passenger already has an active booking for this ride');
	}
	if (freeSeats(ride) <= 0) {
		throw new DomainError('RIDE_FULL', 'No available seats on this ride');
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
		throw new DomainError('BOOKING_NOT_FOUND', 'Active booking not found');
	}
	if (ride.departureAt.getTime() <= now.getTime()) {
		throw new DomainError('RIDE_DEPARTED', 'Cannot cancel booking after departure time');
	}

	return {
		...ride,
		bookings: ride.bookings.map((b) =>
			b === target ? { ...b, status: 'cancelled' } : b
		)
	};
}
