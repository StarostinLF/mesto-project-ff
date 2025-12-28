'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

import ImageIcon from '@/app/icons/image-icon';

type SafeImageProps = Omit<ImageProps, 'src'> & {
	src?: string | null;
	fallbackIconSize?: number;
	// eslint-disable-next-line no-unused-vars
	setModalOpen: (isOpen: boolean) => void;
};

export default function SafeImage({
	src,
	alt,
	fallbackIconSize = 128,
	setModalOpen,
}: SafeImageProps) {
	const [errorSrc, setErrorSrc] = useState<string | null>(null);

	function handleClick() {
		setModalOpen(true);
	}

	const normalizedSrc = typeof src === 'string' ? src.trim() : '';
	const shouldShowFallback =
		normalizedSrc.length === 0 || errorSrc === normalizedSrc;

	if (shouldShowFallback) {
		return (
			<div
				className={
					'flex h-70 w-full items-center justify-center overflow-hidden'
				}
			>
				<ImageIcon aria-hidden={true} size={fallbackIconSize} />
			</div>
		);
	}

	return (
		<button
			className={'relative flex h-70 w-full overflow-hidden'}
			onClick={handleClick}
		>
			<Image
				alt={alt}
				className={'object-cover'}
				sizes={'100vw'}
				src={normalizedSrc}
				fill
				onError={() => setErrorSrc(normalizedSrc)}
			/>
		</button>
	);
}
