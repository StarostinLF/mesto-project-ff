import { ICard } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
	const { _id }: Pick<ICard, '_id'> = await request.json();

	const response = await fetch(`${process.env.API_BASE_URL}/cards/${_id}`, {
		method: 'DELETE',
		headers: {
			Authorization: process.env.API_KEY || '',
		},
	});

	if (response.ok)
		return NextResponse.json(
			{
				success: true,
				message: 'Карточка успешно удалена',
			},
			{ status: response.status },
		);

	return NextResponse.json(
		{
			success: false,
			message: 'Ошибка при удалении карточки',
		},
		{ status: response.status, statusText: response.statusText },
	);
}
