export interface University {
	id: string;
	name: string;
	shortName: string;
	city: string;
	domains: string[];
}

export const SUPPORTED_UNIVERSITIES: University[] = [
	{
		id: 'unibuc',
		name: 'Universitatea din București',
		shortName: 'UniBuc',
		city: 'București',
		domains: ['s.unibuc.ro', 'unibuc.ro']
	},
	{
		id: 'unstpb',
		name: 'Universitatea Națională de Știință și Tehnologie Politehnica București',
		shortName: 'Politehnica București',
		city: 'București',
		domains: ['stud.acs.upb.ro', 'stud.etti.upb.ro', 'stud.upb.ro', 'upb.ro']
	},
	{
		id: 'ase',
		name: 'Academia de Studii Economice din București',
		shortName: 'ASE',
		city: 'București',
		domains: ['stud.ase.ro', 'ase.ro']
	},
	{
		id: 'ubb',
		name: 'Universitatea Babeș-Bolyai',
		shortName: 'UBB Cluj',
		city: 'Cluj-Napoca',
		domains: ['stud.ubbcluj.ro', 'ubbcluj.ro']
	},
	{
		id: 'utcn',
		name: 'Universitatea Tehnică din Cluj-Napoca',
		shortName: 'UTCN',
		city: 'Cluj-Napoca',
		domains: ['student.utcluj.ro', 'utcluj.ro']
	},
	{
		id: 'uaic',
		name: 'Universitatea Alexandru Ioan Cuza',
		shortName: 'UAIC Iași',
		city: 'Iași',
		domains: ['student.uaic.ro', 'uaic.ro']
	},
	{
		id: 'upt',
		name: 'Universitatea Politehnica Timișoara',
		shortName: 'UPT',
		city: 'Timișoara',
		domains: ['student.upt.ro', 'upt.ro']
	},
	{
		id: 'unitbv',
		name: 'Universitatea Transilvania din Brașov',
		shortName: 'UniTbv',
		city: 'Brașov',
		domains: ['unitbv.ro', 'student.unitbv.ro']
	}
];

export function isAuthorizedUniversityEmail(email: string): boolean {
	if (!email || !email.includes('@')) return false;

	const domain = email.trim().split('@')[1]?.toLowerCase();
	if (!domain) return false;

	// Reject generic public mail providers
	const forbiddenProviders = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'hotmail.com'];
	if (forbiddenProviders.includes(domain)) return false;

	// Accept known universities list
	const isKnownUni = SUPPORTED_UNIVERSITIES.some((uni) =>
		uni.domains.some((d) => domain === d || domain.endsWith(`.${d}`))
	);
	if (isKnownUni) return true;

	// Generic academic domain wildcard matching Romanian higher-education institutions
	return domain.endsWith('.edu.ro') || domain.endsWith('.ac.ro');
}

export function resolveUniversityByEmail(email: string): University | null {
	if (!email || !email.includes('@')) return null;

	const domain = email.trim().split('@')[1]?.toLowerCase();
	if (!domain) return null;

	return (
		SUPPORTED_UNIVERSITIES.find((uni) =>
			uni.domains.some((d) => domain === d || domain.endsWith(`.${d}`))
		) ?? null
	);
}
