import { IResponse, IUser } from '../types';

export async function getUser(): Promise<IUser> {
	const response = await fetch(`${process.env.API_BASE_URL}/users/me`, {
		headers: {
			Authorization: process.env.API_KEY || '',
		},
	});
	const user: IUser = await response.json();

	if (response.ok) return user;

	throw new Error('Ошибка при получении данных пользователя');
}

export async function updateUser({
	name,
	about,
}: Pick<IUser, 'name' | 'about'>): Promise<IResponse> {
	const response = await fetch('/api/user/edit', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, about }),
	});
	const data: IResponse = await response.json();

	if (response.ok) return data;

	throw new Error(data.message);
}

export async function updateAvatar({
	avatar,
}: Pick<IUser, 'avatar'>): Promise<IResponse> {
	const response = await fetch('/api/user/update-avatar', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ avatar }),
	});
	const data: IResponse = await response.json();

	if (response.ok) return data;

	throw new Error(data.message);
}
