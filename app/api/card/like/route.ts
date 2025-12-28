import { ICard } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
	const { _id }: Pick<ICard, '_id'> = await request.json();

	const response = await fetch(
		`${process.env.API_BASE_URL}/cards/likes/${_id}`,
		{
			method: 'PUT',
			headers: {
				Authorization: process.env.API_KEY || '',
			},
		},
	);

	if (response.ok) {
		const card: ICard = await response.json();

		return NextResponse.json(
			{
				success: true,
				message: 'Лайк успешно добавлен',
				card,
			},
			{ status: response.status },
		);
	}

	return NextResponse.json(
		{
			success: false,
			message: 'Ошибка при добавлении лайка',
		},
		{ status: response.status, statusText: response.statusText },
	);
}
