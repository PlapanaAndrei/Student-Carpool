import { describe, it, expect } from 'vitest';
import {
	isAuthorizedUniversityEmail,
	resolveUniversityByEmail,
	SUPPORTED_UNIVERSITIES
} from './university';

describe('University Domain & Academic Email Validation', () => {
	it('authorizes student emails from UniBuc', () => {
		expect(isAuthorizedUniversityEmail('daniel.radu@s.unibuc.ro')).toBe(true);
		expect(isAuthorizedUniversityEmail('profesor@unibuc.ro')).toBe(true);

		const uni = resolveUniversityByEmail('daniel.radu@s.unibuc.ro');
		expect(uni?.shortName).toBe('UniBuc');
	});

	it('authorizes student emails from other Romanian universities (Poli, UBB, UTCN, UAIC, etc.)', () => {
		expect(isAuthorizedUniversityEmail('student@stud.acs.upb.ro')).toBe(true);
		expect(isAuthorizedUniversityEmail('student@stud.ubbcluj.ro')).toBe(true);
		expect(isAuthorizedUniversityEmail('student@student.utcluj.ro')).toBe(true);
		expect(isAuthorizedUniversityEmail('student@student.uaic.ro')).toBe(true);
		expect(isAuthorizedUniversityEmail('student@student.upt.ro')).toBe(true);
		expect(isAuthorizedUniversityEmail('student@stud.ase.ro')).toBe(true);
		expect(isAuthorizedUniversityEmail('student@student.unitbv.ro')).toBe(true);
		expect(isAuthorizedUniversityEmail('cercetator@rectorat.edu.ro')).toBe(true);
	});

	it('rejects generic public commercial email providers', () => {
		expect(isAuthorizedUniversityEmail('student@gmail.com')).toBe(false);
		expect(isAuthorizedUniversityEmail('sofer@yahoo.com')).toBe(false);
		expect(isAuthorizedUniversityEmail('test@outlook.com')).toBe(false);
		expect(isAuthorizedUniversityEmail('invalid-email')).toBe(false);
		expect(isAuthorizedUniversityEmail('')).toBe(false);
	});

	it('correctly maps university metadata by institutional domain', () => {
		const ubb = resolveUniversityByEmail('student@stud.ubbcluj.ro');
		expect(ubb?.id).toBe('ubb');
		expect(ubb?.city).toBe('Cluj-Napoca');

		const unstpb = resolveUniversityByEmail('student@stud.acs.upb.ro');
		expect(unstpb?.shortName).toBe('Politehnica București');
	});
});
