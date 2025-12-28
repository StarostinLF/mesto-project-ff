'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ICard } from '@/lib/types';
import { addCard } from '@/lib/fetch-functions/cards';

import Modal from './modal';

import CloseIcon from '@/app/icons/close-icon';

const exampleName = 'Название места';
const exampleLink = 'Ссылка на изображение';

export default function NewCardModal({ onClose }: { onClose: () => void }) {
	const [formData, setFormData] = useState<Pick<ICard, 'name' | 'link'>>({
		name: '',
		link: '',
	});
	const [formErrors, setFormErrors] = useState<
		Pick<ICard, 'name' | 'link'> & { general: string }
	>({
		name: '',
		link: '',
		general: '',
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const router = useRouter();

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const cardLinkRegex = /^https?:\/\/.+\.(?:jpg|jpeg|png|webp)(?:[?#].*)?$/i;

		const nextErrors = {
			name: formData.name.trim() ? '' : 'Вы пропустили это поле.',
			link: formData.link.trim()
				? cardLinkRegex.test(formData.link.trim())
					? ''
					: 'Введите корректный адрес изображения.'
				: 'Вы пропустили это поле.',
			general: '',
		};

		setFormErrors((prev) => ({
			...prev,
			...nextErrors,
		}));

		if (nextErrors.name || nextErrors.link) return;

		setIsLoading(true);

		try {
			await addCard(formData);

			onClose();

			router.refresh();
		} catch (error) {
			if (error instanceof Error)
				setFormErrors((prevFormData) => ({
					...prevFormData,
					general: error.message,
				}));
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Modal onClose={onClose}>
			<article
				className={
					'relative flex w-full max-w-md flex-col gap-13 rounded-lg bg-white p-9 text-black'
				}
			>
				<button
					aria-label={'Закрыть'}
					className={'absolute -top-10 right-0'}
					type={'button'}
					onClick={onClose}
				>
					<CloseIcon />
				</button>
				<h2 className={'text-2xl font-bold'}>Новое место</h2>
				<form className={'flex flex-col gap-13'} onSubmit={handleSubmit}>
					<div className={'relative flex flex-col gap-1'}>
						<label aria-label={'Название места'} htmlFor={'name'} hidden>
							Название места
						</label>
						<input
							className={`w-full border-b pb-1 placeholder:text-neutral-600 ${formErrors.name ? 'border-red-500' : 'border-neutral-600'}`}
							id={'name'}
							name={'name'}
							placeholder={exampleName}
							type={'text'}
							value={formData.name}
							onChange={handleChange}
						/>
						{formErrors.name && (
							<span className={'absolute top-full left-0 text-red-500'}>
								{formErrors.name}
							</span>
						)}
					</div>
					<div className={'relative flex flex-col gap-1'}>
						<label aria-label={'Ссылка на изображение'} htmlFor={'link'} hidden>
							Ссылка на изображение
						</label>
						<input
							className={`w-full border-b pb-1 placeholder:text-neutral-600 ${formErrors.link ? 'border-red-500' : 'border-neutral-600'}`}
							id={'link'}
							name={'link'}
							placeholder={exampleLink}
							type={'text'}
							value={formData.link}
							onChange={handleChange}
						/>
						{formErrors.link && (
							<span className={'absolute top-full left-0 text-red-500'}>
								{formErrors.link}
							</span>
						)}
					</div>
					<button
						aria-label={'Создать карточку'}
						className={
							'mt-6 w-full bg-black px-4 py-2 text-white transition-opacity not-disabled:hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-20'
						}
						disabled={isLoading}
						type={'submit'}
					>
						Создать
					</button>
				</form>
			</article>
		</Modal>
	);
}
