import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { booking } from '$lib/server/db/schema.carpool';
import { bookSeat } from '$lib/domain/booking';
import { DomainError } from '$lib/domain/types';
import { loadRide } from '$lib/server/rideRepository';
import type { RequestHandler } from './$types';

/**
 * US-05: Pasagerul rezervă un loc într-o cursă.
 * Validează regulile prin bookSeat din domeniul de business și creează cererea cu status 'pending'.
 */
export const POST: RequestHandler = async ({ params, locals }) => {
	if (!locals.user) {
		throw error(401, 'Autentificare necesară');
	}

	const current = await loadRide(params.id);
	if (!current) {
		throw error(404, 'Cursa nu există');
	}

	try {
		bookSeat(current, locals.user.id);
	} catch (e) {
		if (e instanceof DomainError) {
			return json({ error: e.code, message: e.message }, { status: 409 });
		}
		throw e;
	}

	const [created] = await db
		.insert(booking)
		.values({ rideId: params.id, passengerId: locals.user.id, status: 'pending' })
		.returning();

	return json(created, { status: 201 });
};
