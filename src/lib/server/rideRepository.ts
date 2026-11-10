import type { Ride } from '$lib/domain/types';
import { bookingsStore } from './db';

export interface RideWithDriverMeta extends Ride {
	driverName: string;
	driverUniversity: string;
	driverUniversityId: string;
	driverFaculty: string;
	driverRating: number;
	carModel: string;
	carColor: string;
	meetingPoint: string;
}

// Student carpool rides nationwide, with UniBuc as the primary showcased hub
const demoRides: Map<string, RideWithDriverMeta> = new Map([
	[
		'ride-brasov-101',
		{
			id: 'ride-brasov-101',
			driverId: 'usr_andrei_plapana',
			driverName: 'Andrei Plăpană',
			driverUniversity: 'Universitatea din București (UniBuc)',
			driverUniversityId: 'unibuc',
			driverFaculty: 'Facultatea de Matematică și Informatică (FMI, Anul 3)',
			driverRating: 4.9,
			carModel: 'Dacia Duster',
			carColor: 'Albastru Metalizat',
			origin: 'București (Complex Grozăvești)',
			meetingPoint: 'Parcarea din fața Căminului A1, Splaiul Independenței',
			destination: 'Brașov (Gara Centrală)',
			departureAt: new Date(Date.now() + 1000 * 60 * 60 * 48), // vineri după-amiază
			totalSeats: 3,
			pricePerSeat: 35,
			status: 'open',
			bookings: []
		}
	],
	[
		'ride-pitesti-102',
		{
			id: 'ride-pitesti-102',
			driverId: 'usr_victor_dumitrescu',
			driverName: 'Victor Dumitrescu',
			driverUniversity: 'Universitatea din București (UniBuc)',
			driverUniversityId: 'unibuc',
			driverFaculty: 'Facultatea de Drept (Anul 4)',
			driverRating: 4.8,
			carModel: 'Volkswagen Golf 7',
			carColor: 'Argintiu',
			origin: 'București (Complex Panduri)',
			meetingPoint: 'Intrarea campusului, Șos. Panduri 90',
			destination: 'Pitești (Centru / Podul Viilor)',
			departureAt: new Date(Date.now() + 1000 * 60 * 60 * 26), // mâine seară
			totalSeats: 3,
			pricePerSeat: 25,
			status: 'open',
			bookings: []
		}
	],
	[
		'ride-ploiesti-103',
		{
			id: 'ride-ploiesti-103',
			driverId: 'usr_alex_popa',
			driverName: 'Alexandru Popa',
			driverUniversity: 'Universitatea din București (UniBuc)',
			driverUniversityId: 'unibuc',
			driverFaculty: 'Facultatea de Geografie (Anul 2)',
			driverRating: 5.0,
			carModel: 'Skoda Octavia',
			carColor: 'Gri',
			origin: 'București (Kogălniceanu / Drept)',
			meetingPoint: 'Platoul Facultății de Drept, Bd. Mihail Kogălniceanu 36-46',
			destination: 'Ploiești (Gara de Sud)',
			departureAt: new Date(Date.now() + 1000 * 60 * 60 * 30),
			totalSeats: 4,
			pricePerSeat: 20,
			status: 'open',
			bookings: []
		}
	],
	[
		'ride-constanta-104',
		{
			id: 'ride-constanta-104',
			driverId: 'usr_maria_ionescu',
			driverName: 'Maria Ionescu',
			driverUniversity: 'Universitatea din București (UniBuc)',
			driverUniversityId: 'unibuc',
			driverFaculty: 'Facultatea de Litere (Anul 3)',
			driverRating: 4.95,
			carModel: 'Renault Clio',
			carColor: 'Roșu',
			origin: 'București (Complex Grozăvești)',
			meetingPoint: 'Ieșirea din stația de metrou Grozăvești',
			destination: 'Constanța (Gara Constanța)',
			departureAt: new Date(Date.now() + 1000 * 60 * 60 * 72),
			totalSeats: 2,
			pricePerSeat: 45,
			status: 'open',
			bookings: []
		}
	],
	[
		'ride-cluj-sibiu-105',
		{
			id: 'ride-cluj-sibiu-105',
			driverId: 'usr_tudor_muresan',
			driverName: 'Tudor Mureșan',
			driverUniversity: 'Universitatea Babeș-Bolyai (UBB Cluj)',
			driverUniversityId: 'ubb',
			driverFaculty: 'Facultatea de Științe Economice și Gestiunea Afacerilor (FSEGA, Anul 3)',
			driverRating: 4.9,
			carModel: 'Ford Focus',
			carColor: 'Negru',
			origin: 'Cluj-Napoca (Campus Hașdeu)',
			meetingPoint: 'Parcarea Căminelor Hașdeu, Str. Bogdan Petriceicu Hasdeu',
			destination: 'Sibiu (Gara Mare)',
			departureAt: new Date(Date.now() + 1000 * 60 * 60 * 50),
			totalSeats: 3,
			pricePerSeat: 30,
			status: 'open',
			bookings: []
		}
	]
]);

export async function loadRide(id: string): Promise<RideWithDriverMeta | null> {
	const ride = demoRides.get(id);
	if (!ride) return null;

	const currentBookings = bookingsStore
		.filter((b) => b.rideId === id)
		.map((b) => ({
			id: b.id,
			passengerId: b.passengerId,
			status: b.status
		}));

	return {
		...ride,
		bookings: currentBookings
	};
}

export async function saveRide(ride: Ride): Promise<void> {
	const existing = demoRides.get(ride.id);
	if (existing) {
		demoRides.set(ride.id, {
			...existing,
			...ride,
			bookings: [...ride.bookings]
		});
	}
}

export async function listRides(): Promise<RideWithDriverMeta[]> {
	const rides = Array.from(demoRides.values());
	return rides.map((ride) => {
		const currentBookings = bookingsStore
			.filter((b) => b.rideId === ride.id)
			.map((b) => ({
				id: b.id,
				passengerId: b.passengerId,
				status: b.status
			}));
		return {
			...ride,
			bookings: currentBookings
		};
	});
}
