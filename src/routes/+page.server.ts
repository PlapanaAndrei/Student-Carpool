import { listRides } from '$lib/server/rideRepository';
import { freeSeats } from '$lib/domain/seats';
import { SUPPORTED_UNIVERSITIES } from '$lib/domain/university';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const rides = await listRides();

	return {
		currentUser: locals.user ?? {
			id: 'usr_student_demo',
			name: 'Radu Daniel',
			email: 'daniel.radu@s.unibuc.ro',
			role: 'passenger'
		},
		universities: SUPPORTED_UNIVERSITIES,
		rides: rides.map((r) => ({
			id: r.id,
			driverId: r.driverId,
			driverName: r.driverName,
			driverUniversity: r.driverUniversity,
			driverUniversityId: r.driverUniversityId,
			driverFaculty: r.driverFaculty,
			driverRating: r.driverRating,
			carModel: r.carModel,
			carColor: r.carColor,
			origin: r.origin,
			destination: r.destination,
			meetingPoint: r.meetingPoint,
			departureAt: r.departureAt.toISOString(),
			totalSeats: r.totalSeats,
			pricePerSeat: r.pricePerSeat,
			status: r.status,
			bookings: r.bookings,
			availableSeats: freeSeats(r)
		}))
	};
};
