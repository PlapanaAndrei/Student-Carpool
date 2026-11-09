import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { booking } from '$lib/server/db/schema.carpool';
import { cancelBooking } from '$lib/domain/booking';
import { DomainError } from '$lib/domain/types';
import { loadRide } from '$lib/server/rideRepository';
import { eq, and } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, locals }) => {
	if (!locals.user) {
		throw error(401, 'Autentificare necesară');
	}

	const current = await loadRide(params.id);
	if (!current) {
		throw error(404, 'Cursa nu există');
	}

	try {
		cancelBooking(current, locals.user.id);
	} catch (e) {
		if (e instanceof DomainError) {
			return json({ error: e.code, message: e.message }, { status: 409 });
		}
		throw e;
	}

	const [updated] = await db
		.update(booking)
		.set({ status: 'cancelled' })
		.where(and(eq(booking.rideId, params.id), eq(booking.passengerId, locals.user.id)))
		.returning();

	if (!updated) {
		throw error(404, 'Rezervarea nu a fost găsită în baza de date');
	}

	return json(updated, { status: 200 });
};
