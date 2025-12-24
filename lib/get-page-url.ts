'use server';

import { headers } from 'next/headers';

export async function getPageUrl() {
	const headersList = await headers();
	const domain = headersList.get('host');
	const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

	const baseUrl = `${protocol}://${domain}`;
	const currentUrl = headersList.get('referer') || '';

	return { baseUrl, currentUrl };
}
