import { ICard, IResponse } from '../types';

export async function getCards(): Promise<ICard[]> {
	const response = await fetch(`${process.env.API_BASE_URL}/cards`, {
		headers: {
			Authorization: process.env.API_KEY || '',
		},
	});

	if (response.ok) return response.json();

	throw new Error('Ошибка при получении карточек');
}

export async function addCard({
	name,
	link,
}: Pick<ICard, 'name' | 'link'>): Promise<IResponse> {
	const response = await fetch('/api/card/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, link }),
	});
	const data: IResponse = await response.json();

	if (response.ok) return data;

	throw new Error(data.message);
}

export async function deleteCard({
	_id,
}: Pick<ICard, '_id'>): Promise<IResponse> {
	const response = await fetch('/api/card/delete', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ _id }),
	});
	const data: IResponse = await response.json();

	if (response.ok) return data;

	throw new Error(data.message);
}

export async function likeCard({
	_id,
}: Pick<ICard, '_id'>): Promise<IResponse> {
	const response = await fetch('/api/card/like', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ _id }),
	});
	const data: IResponse = await response.json();

	if (response.ok) return data;

	throw new Error(data.message);
}

export async function dislikeCard({
	_id,
}: Pick<ICard, '_id'>): Promise<IResponse> {
	const response = await fetch('/api/card/dislike', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ _id }),
	});
	const data: IResponse = await response.json();

	if (response.ok) return data;

	throw new Error(data.message);
}
