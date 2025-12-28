'use client';

import { useEffect, useRef } from 'react';

import { useBodyScrollLock } from '@/lib/hooks/use-body-scroll-lock';

type ModalProps = {
	children: React.ReactNode;
	onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
	useBodyScrollLock(true);

	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				e.preventDefault();

				onClose();
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	useEffect(() => {
		containerRef.current?.focus();
	}, []);

	function handleBackdropMouseDown(e: React.MouseEvent<HTMLDivElement>) {
		if (e.target === e.currentTarget) onClose();
	}

	return (
		<div
			ref={containerRef}
			aria-label={'Оверлей модального окна'}
			aria-modal={true}
			className={
				'fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
			}
			role={'dialog'}
			tabIndex={-1}
			onMouseDown={handleBackdropMouseDown}
		>
			{children}
		</div>
	);
}
