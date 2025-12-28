import { ICard } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const { name, link }: Pick<ICard, 'name' | 'link'> = await request.json();

	const response = await fetch(`${process.env.API_BASE_URL}/cards`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: process.env.API_KEY || '',
		},
		body: JSON.stringify({ name, link }),
	});

	if (response.ok) {
		const card: ICard = await response.json();

		return NextResponse.json(
			{
				success: true,
				message: 'Карточка успешно добавлена',
				card,
			},
			{ status: response.status },
		);
	}

	return NextResponse.json(
		{
			success: false,
			message: 'Ошибка при добавлении карточки',
		},
		{ status: response.status, statusText: response.statusText },
	);
}
