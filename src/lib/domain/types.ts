export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';
export type RideStatus = 'open' | 'cancelled' | 'completed';

export interface Booking {
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

/** Eroare de business, cu cod stabil ca testele sa nu depinda de text. */
export class DomainError extends Error {
	constructor(
		public readonly code: string,
		message?: string
	) {
		super(message ?? code);
		this.name = 'DomainError';
	}
}
