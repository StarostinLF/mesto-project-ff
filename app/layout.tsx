import './styles/tailwind.css';

import type { Metadata } from 'next';

import { getPageUrl } from '@/lib/get-page-url';
import { SITE_NAME, DESCRIPTION } from '@/lib/constants';
import { mainFont } from '@/lib/fonts';

import Header from './components/header';
import Footer from './components/footer';

export async function generateMetadata(): Promise<Metadata> {
	const { baseUrl } = await getPageUrl();

	return {
		title: SITE_NAME,
		description: DESCRIPTION,
		generator: 'Next.js',
		applicationName: 'Mesto Project FF',
		referrer: 'origin-when-cross-origin',
		metadataBase: new URL(baseUrl),
		openGraph: {
			title: SITE_NAME,
			description: DESCRIPTION,
			url: baseUrl,
			siteName: SITE_NAME,
			locale: 'ru_RU',
			type: 'website',
		},
		robots: {
			index: false,
			follow: false,
			nocache: false,
			googleBot: {
				index: false,
				follow: false,
				noimageindex: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		manifest: `${baseUrl}/manifest.webmanifest`,
		verification: {
			google: 'google',
			yandex: 'yandex',
			yahoo: 'yahoo',
		},
		alternates: {
			canonical: baseUrl,
		},
	};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className={'relative h-full min-h-dvh scroll-smooth'} lang={'ru'}>
			<body
				className={`${mainFont.className} container mx-auto flex h-full min-h-dvh w-full max-w-xs flex-col gap-6 scroll-smooth bg-black text-sm text-white antialiased sm:max-w-xl sm:gap-10 md:max-w-2xl lg:max-w-4xl`}
			>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
