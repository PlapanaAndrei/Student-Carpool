<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
	<!-- Navigation bar -->
	<header class="border-b border-slate-200 bg-white sticky top-0 z-30">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
			<!-- Logo and App Title -->
			<div class="flex items-center gap-8">
				<a href="/" class="flex items-center gap-3 group">
					<div class="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
						SC
					</div>
					<div class="flex flex-col">
						<span class="font-bold text-base tracking-tight text-slate-900">StudentCarpool</span>
						<span class="text-[11px] font-medium text-slate-500">Rețeaua Universitară din România</span>
					</div>
				</a>

				<!-- Top Navigation Links -->
				<nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
					<a href="/" class="text-blue-600 font-semibold border-b-2 border-blue-600 py-5">
						Curse disponibile
					</a>
					<span class="text-slate-400 text-xs py-5" title="În curând">
						Adaugă cursă
					</span>
					<span class="text-slate-400 text-xs py-5" title="În curând">
						Istoric & Notificări
					</span>
				</nav>
			</div>

			<!-- User session widget in corner -->
			<div class="flex items-center gap-3">
				<div class="text-right hidden sm:block">
					<div class="flex items-center justify-end gap-1.5">
						<span class="text-xs font-semibold text-slate-900">Radu Daniel</span>
						<span class="text-[10px] font-semibold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">UniBuc</span>
					</div>
					<p class="text-[11px] text-slate-500">daniel.radu@s.unibuc.ro</p>
				</div>
				<div class="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center text-xs font-bold">
					RD
				</div>
			</div>
		</div>
	</header>

	<!-- Page Content -->
	<main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
		{@render children()}
	</main>

	<!-- Minimal Footer -->
	<footer class="border-t border-slate-200 bg-white py-6">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
			<p>© 2026 StudentCarpool — Rețeaua Națională de Carpooling Universitar din România.</p>
			<p class="text-slate-400">Mobilitate studențească sustenabilă pentru toate universitățile acreditate.</p>
		</div>
	</footer>
</div>
