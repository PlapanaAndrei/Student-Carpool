import { DomainError, type Ride } from './types';
import { freeSeats } from './seats';

export { DomainError, freeSeats, type Ride };

/** US-05: pasagerul cere un loc. Cererea ramane "pending" pana raspunde soferul (US-06). */
export function bookSeat(ride: Ride, passengerId: string, now: Date = new Date()): Ride {
	throw new Error("Not implemented");
}

/** US-07: pasagerul isi anuleaza rezervarea; locul se elibereaza. */
export function cancelBooking(ride: Ride, passengerId: string, now: Date = new Date()): Ride {
	throw new Error("Not implemented");
}
