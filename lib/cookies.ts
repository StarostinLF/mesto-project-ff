'use server';

import { cookies } from 'next/headers';

export async function saveToCookie(name: string, data: object) {
	const cookieStore = await cookies();

	cookieStore.set({
		name: name,
		value: JSON.stringify(data),
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
		path: '/',
	});
}

export async function loadFromCookie<T extends object>(
	name: string,
): Promise<T> {
	const cookie = await cookies();
	const getcookie = cookie.get(name);

	if (cookie.has(name) && getcookie) {
		return JSON.parse(getcookie.value);
	}

	return {} as T;
}

export async function deleteCookie(name: string) {
	const cookieStore = await cookies();

	cookieStore.delete(name);
}
