import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const roleHeader = event.request.headers.get('x-demo-role') || event.cookies.get('demo_role');

	if (roleHeader === 'driver') {
		event.locals.user = {
			id: 'usr_andrei_plapana',
			name: 'Andrei Plăpană',
			email: 'andrei.plapana@s.unibuc.ro',
			role: 'driver'
		};
	} else {
		event.locals.user = {
			id: 'usr_student_demo',
			name: 'Radu Daniel',
			email: 'daniel.radu@s.unibuc.ro',
			role: 'passenger'
		};
	}

	return resolve(event);
};
