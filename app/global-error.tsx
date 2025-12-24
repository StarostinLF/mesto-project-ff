'use client';

import './styles/tailwind.css';

import { mainFont } from '@/lib/fonts';

export default function GlobalError({
	error,
}: {
	error: Error & { digest?: string };
}) {
	return (
		<html>
			<body
				className={`${mainFont.className} container mx-auto flex h-full min-h-dvh w-full max-w-7xl flex-col gap-10 scroll-smooth bg-black text-sm text-white antialiased`}
			>
				<main
					className={
						'container mx-auto flex flex-auto flex-col items-center justify-center gap-8 px-2 py-2'
					}
				>
					<div
						className={
							'flex flex-auto flex-col items-center justify-center text-center'
						}
					>
						<h1 className={'text-2xl font-bold md:text-3xl'}>
							Mesto Russia временно недоступен
						</h1>
						<p className={'pt-4 pb-10'}>
							Ведутся технические работы. Пожалуйста, попробуйте обновить
							страницу через несколько минут или зайти в веб-приложение позднее.
						</p>
					</div>
					<span className={'text-center'}>{error.message}</span>
				</main>
			</body>
		</html>
	);
}
