export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';
export type RideStatus = 'open' | 'cancelled' | 'completed';

export interface Booking {
	id?: string;
	passengerId: string;
	status: BookingStatus;
}

export interface Ride {
	id: string;
	driverId: string;
	origin: string;
	destination: string;
	departureAt: Date;
	totalSeats: number;
	pricePerSeat: number;
	status: RideStatus;
	bookings: Booking[];
}

export class DomainError extends Error {
	constructor(
		public readonly code: string,
		message?: string
	) {
		super(message ?? code);
		this.name = 'DomainError';
	}
}
