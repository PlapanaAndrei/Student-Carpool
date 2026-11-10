<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Tab filter: 'all' | 'my-bookings' | 'driver-panel'
	let activeTab = $state<'all' | 'my-bookings' | 'driver-panel'>('all');

	// University hub filter (defaulting to UniBuc as showcase)
	let selectedUniversity = $state<string>('unibuc');

	// Text search filter
	let searchQuery = $state('');

	// Action feedback
	let feedback = $state<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
	let isProcessing = $state(false);

	// Filtered rides
	let displayedRides = $derived(
		data.rides.filter((ride) => {
			// University hub filter
			if (selectedUniversity !== 'all' && ride.driverUniversityId !== selectedUniversity) {
				return false;
			}

			// Destination or origin text query
			if (searchQuery.trim()) {
				const query = searchQuery.toLowerCase();
				const destMatch = ride.destination.toLowerCase().includes(query);
				const originMatch = ride.origin.toLowerCase().includes(query);
				const uniMatch = ride.driverUniversity.toLowerCase().includes(query);
				if (!destMatch && !originMatch && !uniMatch) return false;
			}

			if (activeTab === 'my-bookings') {
				return ride.bookings.some(
					(b) => b.passengerId === data.currentUser.id && b.status !== 'cancelled'
				);
			}

			if (activeTab === 'driver-panel') {
				return ride.driverId === 'usr_andrei_plapana';
			}

			return true;
		})
	);

	function formatDate(isoString: string) {
		const date = new Date(isoString);
		return date.toLocaleDateString('ro-RO', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	async function handleBook(rideId: string) {
		isProcessing = true;
		feedback = null;

		try {
			const res = await fetch(`/api/rides/${rideId}/book`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-demo-role': 'passenger'
				}
			});

			const body = await res.json().catch(() => ({}));

			if (res.ok) {
				feedback = {
					type: 'success',
					message: 'Cererea de rezervare a fost înregistrată și trimisă șoferului spre confirmare.'
				};
				await invalidateAll();
			} else {
				const errorMsg =
					body.error === 'ALREADY_BOOKED'
						? 'Ai deja o rezervare activă pentru această cursă.'
						: body.error === 'RIDE_FULL'
							? 'Ne pare rău, toate locurile pentru această cursă au fost ocupate.'
							: body.message || 'Nu s-a putut efectua rezervarea.';
				feedback = { type: 'error', message: errorMsg };
			}
		} catch (err: any) {
			feedback = { type: 'error', message: `Eroare de conexiune: ${err.message}` };
		} finally {
			isProcessing = false;
		}
	}

	async function handleCancel(rideId: string) {
		if (!confirm('Ești sigur că dorești să anulezi rezervarea?')) return;

		isProcessing = true;
		feedback = null;

		try {
			const res = await fetch(`/api/rides/${rideId}/cancel`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-demo-role': 'passenger'
				}
			});

			const body = await res.json().catch(() => ({}));

			if (res.ok) {
				feedback = {
					type: 'info',
					message: 'Rezervarea a fost anulată. Locul a fost repus în disponibilitate.'
				};
				await invalidateAll();
			} else {
				feedback = {
					type: 'error',
					message: body.message || 'Eroare la anularea rezervării.'
				};
			}
		} catch (err: any) {
			feedback = { type: 'error', message: `Eroare de rețea: ${err.message}` };
		} finally {
			isProcessing = false;
		}
	}

	async function handleDriverDecision(bookingId: string, decision: 'accept' | 'reject') {
		isProcessing = true;
		feedback = null;

		try {
			const res = await fetch(`/api/bookings/${bookingId}/decision`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-demo-role': 'driver'
				},
				body: JSON.stringify({ decision })
			});

			const body = await res.json().catch(() => ({}));

			if (res.ok) {
				feedback = {
					type: 'success',
					message: `Cererea pasagerului a fost ${decision === 'accept' ? 'acceptată' : 'respinsă'}.`
				};
				await invalidateAll();
			} else {
				feedback = {
					type: 'error',
					message: body.message || 'Nu s-a putut procesa decizia.'
				};
			}
		} catch (err: any) {
			feedback = { type: 'error', message: `Eroare de rețea: ${err.message}` };
		} finally {
			isProcessing = false;
		}
	}
</script>

<div class="space-y-6">
	<!-- Page Header with national university scope -->
	<div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
		<div class="max-w-3xl">
			<h1 class="text-2xl font-bold text-slate-900">
				Curse între campusurile universitare și provincie
			</h1>
			<p class="text-sm text-slate-600 mt-1.5 leading-relaxed">
				Rețea deschisă studenților din toate universitățile acreditate din România.
				Găsește colegi care călătoresc în același oraș la sfârșit de săptămână și călătorește în siguranță cu cont instituțional validat.
			</p>
		</div>

		<!-- University Hub Selector & Search Bar -->
		<div class="mt-6 pt-6 border-t border-slate-100 space-y-4">
			<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<!-- University filter pills -->
				<div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs font-medium text-slate-600">
					<span class="text-slate-400 font-normal shrink-0">Centru universitar:</span>
					<button
						onclick={() => (selectedUniversity = 'unibuc')}
						class="px-2.5 py-1 rounded-md transition-colors shrink-0 {selectedUniversity === 'unibuc' ? 'bg-blue-600 text-white font-semibold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}"
					>
						UniBuc (București)
					</button>
					<button
						onclick={() => (selectedUniversity = 'ubb')}
						class="px-2.5 py-1 rounded-md transition-colors shrink-0 {selectedUniversity === 'ubb' ? 'bg-blue-600 text-white font-semibold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}"
					>
						UBB (Cluj)
					</button>
					<button
						onclick={() => (selectedUniversity = 'all')}
						class="px-2.5 py-1 rounded-md transition-colors shrink-0 {selectedUniversity === 'all' ? 'bg-blue-600 text-white font-semibold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}"
					>
						Toate universitățile ({data.rides.length})
					</button>
				</div>

				<!-- Search input -->
				<div class="relative w-full sm:w-64">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Caută destinație sau campus..."
						class="w-full pl-3 pr-8 py-1.5 text-xs rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
					/>
					{#if searchQuery}
						<button
							onclick={() => (searchQuery = '')}
							class="absolute right-2.5 top-1.5 text-slate-400 hover:text-slate-600 text-xs"
						>
							✕
						</button>
					{/if}
				</div>
			</div>

			<!-- Navigation Tabs -->
			<div class="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-600 w-fit">
				<button
					onclick={() => (activeTab = 'all')}
					class="px-3 py-1.5 rounded-md transition-all {activeTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}"
				>
					Curse disponibile ({displayedRides.length})
				</button>
				<button
					onclick={() => (activeTab = 'my-bookings')}
					class="px-3 py-1.5 rounded-md transition-all {activeTab === 'my-bookings' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}"
				>
					Rezervările mele
				</button>
				<button
					onclick={() => (activeTab = 'driver-panel')}
					class="px-3 py-1.5 rounded-md transition-all {activeTab === 'driver-panel' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'}"
				>
					Panou Șofer (Andrei Plăpană)
				</button>
			</div>
		</div>
	</div>

	<!-- System feedback message -->
	{#if feedback}
		<div
			class="p-4 rounded-lg text-sm font-medium border {feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : feedback.type === 'error' ? 'bg-rose-50 text-rose-800 border-rose-200' : 'bg-blue-50 text-blue-800 border-blue-200'}"
		>
			{feedback.message}
		</div>
	{/if}

	<!-- Driver Panel Notice (when in driver mode) -->
	{#if activeTab === 'driver-panel'}
		<div class="bg-blue-50/70 border border-blue-200 rounded-lg p-4 text-xs text-blue-900 leading-relaxed">
			<span class="font-bold">Panou Șofer:</span> Gestionează cererile de rezervare primite de la pasageri pentru cursele tale.
		</div>
	{/if}

	<!-- Ride Listings -->
	<div class="space-y-4">
		{#if displayedRides.length === 0}
			<div class="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
				Nu a fost găsită nicio cursă conform filtrelor selectate.
			</div>
		{:else}
			{#each displayedRides as ride (ride.id)}
				{@const userBooking = ride.bookings.find((b) => b.passengerId === data.currentUser.id && b.status !== 'cancelled')}
				{@const pendingRequests = ride.bookings.filter((b) => b.status === 'pending')}

				<div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-slate-300 transition-colors">
					<div class="p-5 sm:p-6">
						<!-- Top row: Origin -> Destination and Price -->
						<div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
							<div class="space-y-1">
								<div class="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
									<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200">
										{ride.driverUniversity}
									</span>
									<span>•</span>
									<span>{formatDate(ride.departureAt)}</span>
								</div>

								<h2 class="text-lg font-bold text-slate-900 flex items-center gap-2 pt-1">
									<span>{ride.origin}</span>
									<span class="text-slate-400 font-normal">→</span>
									<span>{ride.destination}</span>
								</h2>

								<p class="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5">
									<span class="font-medium text-slate-700">Punct de întâlnire:</span>
									<span>{ride.meetingPoint}</span>
								</p>
							</div>

							<!-- Price and seats remaining -->
							<div class="sm:text-right shrink-0">
								<div class="text-xl font-extrabold text-slate-900">
									{ride.pricePerSeat} <span class="text-xs font-semibold text-slate-500">RON</span>
								</div>
								<div class="text-xs mt-0.5">
									{#if ride.availableSeats > 0}
										<span class="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
											{ride.availableSeats} {ride.availableSeats === 1 ? 'loc disponibil' : 'locuri disponibile'}
										</span>
									{:else}
										<span class="font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
											Complet rezervat
										</span>
									{/if}
								</div>
							</div>
						</div>

						<!-- Middle row: Driver Details -->
						<div class="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
							<div class="flex items-center gap-3">
								<div class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs border border-slate-200">
									{ride.driverName.split(' ').map((n) => n[0]).join('')}
								</div>
								<div>
									<div class="flex items-center gap-2">
										<span class="font-semibold text-slate-800">{ride.driverName}</span>
										<span class="text-amber-600 font-medium">★ {ride.driverRating}</span>
									</div>
									<p class="text-slate-500 text-[11px]">{ride.driverFaculty}</p>
								</div>
							</div>

							<div class="text-slate-500 text-[11px] sm:text-right">
								<p><span class="text-slate-700 font-medium">Autovehicul:</span> {ride.carModel} ({ride.carColor})</p>
								<p>Capacitate totală: {ride.totalSeats} pasageri</p>
							</div>
						</div>

						<!-- Passenger Actions -->
						{#if activeTab !== 'driver-panel'}
							<div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
								<div>
									{#if userBooking}
										<div class="flex items-center gap-2 text-xs">
											<span class="font-medium text-slate-700">Status rezervare:</span>
											<span class="px-2 py-0.5 rounded font-semibold {userBooking.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : userBooking.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}">
												{userBooking.status === 'accepted' ? 'Confirmată de șofer' : 'În așteptarea confirmării șoferului'}
											</span>
										</div>
									{:else}
										<p class="text-[11px] text-slate-400">
											Rezervarea se transmite instant prin platformă.
										</p>
									{/if}
								</div>

								<div class="flex items-center gap-2">
									{#if userBooking}
										<button
											onclick={() => handleCancel(ride.id)}
											disabled={isProcessing}
											class="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors disabled:opacity-50"
										>
											Anulează rezervarea
										</button>
									{:else}
										<button
											onclick={() => handleBook(ride.id)}
											disabled={isProcessing || ride.availableSeats <= 0}
											class="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
										>
											{ride.availableSeats > 0 ? 'Rezervă 1 loc' : 'Fără locuri'}
										</button>
									{/if}
								</div>
							</div>
						{/if}

						<!-- Driver Actions -->
						{#if activeTab === 'driver-panel' && ride.driverId === 'usr_andrei_plapana'}
							<div class="mt-5 pt-4 border-t border-slate-100 space-y-3">
								<h3 class="text-xs font-bold text-slate-800">
									Cereri de rezervare primite de la pasageri ({pendingRequests.length} în așteptare)
								</h3>

								{#if pendingRequests.length === 0}
									<p class="text-xs text-slate-400 italic">Nu există cereri în așteptare pentru această cursă.</p>
								{:else}
									<div class="space-y-2">
										{#each pendingRequests as req}
											<div class="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
												<div>
													<p class="font-semibold text-slate-800">
														Pasager: Radu Daniel ({req.passengerId})
													</p>
													<p class="text-slate-500 text-[11px]">Solicită 1 loc • Punct întâlnire: {ride.meetingPoint}</p>
												</div>

												<div class="flex items-center gap-2">
													<button
														onclick={() => handleDriverDecision(req.id || '', 'accept')}
														disabled={isProcessing || !req.id}
														class="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-colors disabled:opacity-50"
													>
														Acceptă cererea
													</button>
													<button
														onclick={() => handleDriverDecision(req.id || '', 'reject')}
														disabled={isProcessing || !req.id}
														class="px-3 py-1.5 rounded-md bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs transition-colors disabled:opacity-50"
													>
														Respinge
													</button>
												</div>
											</div>
										{/each}
									</div>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
