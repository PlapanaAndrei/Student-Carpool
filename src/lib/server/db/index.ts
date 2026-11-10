import type { BookingRecord } from './schema.carpool';

// In-memory bookings store shared across the server instance
export const bookingsStore: BookingRecord[] = [];

function extractConditions(sqlObj: any): Array<{ col: string; val: any }> {
	const result: Array<{ col: string; val: any }> = [];
	if (!sqlObj || !sqlObj.queryChunks) return result;

	const chunks = sqlObj.queryChunks;
	for (let i = 0; i < chunks.length; i++) {
		const chunk = chunks[i];
		if (chunk && chunk.name && chunks[i + 2] && chunks[i + 2].value !== undefined) {
			result.push({ col: chunk.name, val: chunks[i + 2].value });
		} else if (chunk && chunk.queryChunks) {
			result.push(...extractConditions(chunk));
		}
	}
	return result;
}

function matchesCondition(record: BookingRecord, condition: any): boolean {
	if (!condition) return true;

	const conds = extractConditions(condition);
	if (conds.length === 0) return true;

	for (const { col, val } of conds) {
		let key: string = col;
		if (col === 'ride_id') key = 'rideId';
		if (col === 'passenger_id') key = 'passengerId';
		if ((record as any)[key] !== val) return false;
	}

	return true;
}

export const db = {
	select() {
		return {
			from(_table: any) {
				return {
					where(condition: any) {
						const results = bookingsStore.filter((r) => matchesCondition(r, condition));
						return Promise.resolve(results);
					}
				};
			}
		};
	},

	insert(_table: any) {
		return {
			values(valuesObj: Partial<BookingRecord>) {
				const newRecord: BookingRecord = {
					id: valuesObj.id || `bkg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
					rideId: valuesObj.rideId || '',
					passengerId: valuesObj.passengerId || '',
					status: valuesObj.status || 'pending',
					createdAt: valuesObj.createdAt || new Date()
				};
				bookingsStore.push(newRecord);

				return {
					returning() {
						return Promise.resolve([newRecord]);
					}
				};
			}
		};
	},

	update(_table: any) {
		return {
			set(updates: Partial<BookingRecord>) {
				return {
					where(condition: any) {
						const matching = bookingsStore.filter((r) => matchesCondition(r, condition));
						matching.forEach((r) => {
							Object.assign(r, updates);
						});

						return {
							returning() {
								return Promise.resolve(matching);
							}
						};
					}
				};
			}
		};
	}
};
