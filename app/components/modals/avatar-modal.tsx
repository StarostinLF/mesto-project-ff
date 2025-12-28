'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { IUser } from '@/lib/types';
import { updateAvatar } from '@/lib/fetch-functions/user';

import Modal from './modal';

import CloseIcon from '@/app/icons/close-icon';

const exampleAvatarURL = 'Ссылка на изображение профиля';

export default function AvatarModal({ onClose }: { onClose: () => void }) {
	const [formData, setFormData] = useState<Pick<IUser, 'avatar'>>({
		avatar: '',
	});
	const [formErrors, setFormErrors] = useState<
		Pick<IUser, 'avatar'> & { general: string }
	>({
		avatar: '',
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

		const avatarUrlRegex = /^https?:\/\/.+\.(?:jpg|jpeg|png|webp)(?:[?#].*)?$/i;
		const avatarTrimmed = formData.avatar.trim();

		const nextErrors = {
			avatar: formData.avatar.trim()
				? avatarUrlRegex.test(avatarTrimmed)
					? ''
					: 'Введите корректный адрес изображения.'
				: 'Вы пропустили это поле.',
			general: '',
		};

		setFormErrors((prev) => ({
			...prev,
			...nextErrors,
		}));

		if (nextErrors.avatar) return;

		setIsLoading(true);

		try {
			await updateAvatar({ avatar: formData.avatar });

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
				<h2 className={'text-2xl font-bold'}>Редактировать профиль</h2>
				<form className={'flex flex-col gap-13'} onSubmit={handleSubmit}>
					<div className={'relative flex flex-col gap-1'}>
						<label
							aria-label={'Ссылка на изображение профиля'}
							htmlFor={'avatar'}
							hidden
						>
							Ссылка на изображение профиля
						</label>
						<input
							className={`w-full border-b pb-1 placeholder:text-neutral-600 ${formErrors.avatar ? 'border-red-500' : 'border-neutral-600'}`}
							id={'avatar'}
							name={'avatar'}
							placeholder={exampleAvatarURL}
							type={'text'}
							value={formData.avatar}
							onChange={handleChange}
						/>
						{formErrors.avatar && (
							<span className={'absolute top-full left-0 text-red-500'}>
								{formErrors.avatar}
							</span>
						)}
					</div>
					<button
						aria-label={'Сохранить'}
						className={
							'mt-6 w-full bg-black px-4 py-2 text-white transition-opacity not-disabled:hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-20'
						}
						disabled={isLoading}
						type={'submit'}
					>
						Сохранить
					</button>
				</form>
			</article>
		</Modal>
	);
}
