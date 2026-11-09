import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { booking } from '$lib/server/db/schema.carpool';
import { respondToBooking, type Decision } from '$lib/domain/bookingDecision';
import { DomainError } from '$lib/domain/types';
import { loadRide } from '$lib/server/rideRepository';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request, locals }) => {
	if (!locals.user) {
		throw error(401, 'Autentificare necesară');
	}

	const body = await request.json().catch(() => null);
	if (!body || (body.decision !== 'accept' && body.decision !== 'reject')) {
		throw error(400, "Câmpul 'decision' este obligatoriu și trebuie să fie 'accept' sau 'reject'");
	}

	const bookingId = params.id;
	const [targetBooking] = await db.select().from(booking).where(eq(booking.id, bookingId));
	if (!targetBooking) {
		throw error(404, 'Rezervarea nu a fost găsită');
	}

	const currentRide = await loadRide(targetBooking.rideId);
	if (!currentRide) {
		throw error(404, 'Cursa asociată nu a fost găsită');
	}

	try {
		respondToBooking(
			currentRide,
			locals.user.id,
			targetBooking.passengerId,
			body.decision as Decision
		);
	} catch (e) {
		if (e instanceof DomainError) {
			return json({ error: e.code, message: e.message }, { status: 409 });
		}
		throw e;
	}

	const newStatus = body.decision === 'accept' ? 'accepted' : 'rejected';
	const [updated] = await db
		.update(booking)
		.set({ status: newStatus })
		.where(eq(booking.id, bookingId))
		.returning();

	if (!updated) {
		throw error(404, 'Rezervarea nu a putut fi actualizată');
	}

	return json(updated, { status: 200 });
};
