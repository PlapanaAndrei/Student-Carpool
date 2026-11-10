import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface BookingRecord {
	id: string;
	rideId: string;
	passengerId: string;
	status: BookingStatus;
	createdAt: Date;
}

export const booking = pgTable('booking', {
	id: text('id').primaryKey(),
	rideId: text('ride_id').notNull(),
	passengerId: text('passenger_id').notNull(),
	status: text('status').$type<BookingStatus>().notNull().default('pending'),
	createdAt: timestamp('created_at').defaultNow().notNull()
});
