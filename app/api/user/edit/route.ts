import { IUser } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
	const { name, about }: Pick<IUser, 'name' | 'about'> = await request.json();

	const response = await fetch(`${process.env.API_BASE_URL}/users/me`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: process.env.API_KEY || '',
		},
		body: JSON.stringify({ name, about }),
	});

	if (response.ok) {
		const user: IUser = await response.json();

		return NextResponse.json(
			{
				success: true,
				message: 'Пользователь успешно обновлён',
				user,
			},
			{ status: response.status },
		);
	}

	return NextResponse.json(
		{
			success: false,
			message: 'Ошибка при обновлении пользователя',
		},
		{ status: response.status, statusText: response.statusText },
	);
}
