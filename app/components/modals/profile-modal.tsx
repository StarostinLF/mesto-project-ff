'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { IUser } from '@/lib/types';
import { updateUser } from '@/lib/fetch-functions/user';

import CloseIcon from '@/app/icons/close-icon';

import Modal from './modal';

const exampleName = 'Жак-Ив Кусто';
const exampleAbout = 'Исследователь океана';

export default function ProfileModal({
	user,
	onClose,
}: {
	user: Pick<IUser, 'name' | 'about'>;
	onClose: () => void;
}) {
	const [formData, setFormData] = useState<Pick<IUser, 'name' | 'about'>>({
		name: user.name || exampleName,
		about: user.about || exampleAbout,
	});
	const [formErrors, setFormErrors] = useState<
		Pick<IUser, 'name' | 'about'> & { general: string }
	>({
		name: '',
		about: '',
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

		const nextErrors = {
			name: formData.name.trim() ? '' : 'Вы пропустили это поле.',
			about: formData.about.trim() ? '' : 'Вы пропустили это поле.',
			general: '',
		};

		setFormErrors((prev) => ({
			...prev,
			...nextErrors,
		}));

		if (nextErrors.name || nextErrors.about) return '';

		setIsLoading(true);

		try {
			await updateUser(formData);

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

		return '';
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
						<label aria-label={'Имя'} htmlFor={'name'} hidden>
							Имя
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
						<label aria-label={'О себе'} htmlFor={'about'} hidden>
							О себе
						</label>
						<input
							className={`w-full border-b pb-1 placeholder:text-neutral-600 ${formErrors.about ? 'border-red-500' : 'border-neutral-600'}`}
							id={'about'}
							name={'about'}
							placeholder={exampleAbout}
							type={'text'}
							value={formData.about}
							onChange={handleChange}
						/>
						{formErrors.about && (
							<span className={'absolute top-full left-0 text-red-500'}>
								{formErrors.about}
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
