import { IUser } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
	const { avatar }: Pick<IUser, 'avatar'> = await request.json();

	const response = await fetch(`${process.env.API_BASE_URL}/users/me/avatar`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: process.env.API_KEY || '',
		},
		body: JSON.stringify({ avatar }),
	});

	if (response.ok) {
		const user: IUser = await response.json();

		return NextResponse.json(
			{
				success: true,
				message: 'Аватар пользователя успешно обновлён',
				user,
			},
			{ status: response.status },
		);
	}

	return NextResponse.json(
		{
			success: false,
			message: 'Ошибка при обновлении аватара пользователя',
		},
		{ status: response.status, statusText: response.statusText },
	);
}
