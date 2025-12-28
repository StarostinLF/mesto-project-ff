'use client';

import { useState } from 'react';
import Image from 'next/image';

import { IUser } from '@/lib/types';

import AvatarModal from './modals/avatar-modal';
import ProfileModal from './modals/profile-modal';
import NewCardModal from './modals/new-card-modal';

import EditIcon from '@/app/icons/edit-icon';
import AddIcon from '@/app/icons/add-icon';

export function Profile({ user }: { user: IUser }) {
	const [isUpdateAvatarModalOpen, setIsUpdateAvatarModalOpen] =
		useState<boolean>(false);
	const [isEditProfileModalOpen, setIsEditProfileModalOpen] =
		useState<boolean>(false);
	const [isAddCardModalOpen, setIsAddCardModalOpen] = useState<boolean>(false);

	return (
		<section
			className={
				'flex flex-col items-center justify-between gap-2 text-white sm:flex-row sm:gap-4'
			}
		>
			<div className={'flex min-w-0 items-center gap-4'}>
				<button
					aria-label={'Обновить аватар'}
					className={'group relative h-30 w-30 overflow-hidden rounded-full'}
					type={'button'}
					onClick={() => setIsUpdateAvatarModalOpen(true)}
				>
					<Image
						alt={user.name}
						className={'object-cover transition-opacity group-hover:opacity-80'}
						src={user.avatar}
						fill
					/>
					<span
						className={
							'pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/80 group-hover:opacity-100'
						}
					>
						<EditIcon size={20} />
					</span>
				</button>
				<div className={'flex min-w-0 flex-col gap-1.5'}>
					<div className={'flex items-center gap-4'}>
						<h1 className={'text-3xl'} title={user.name}>
							{user.name}
						</h1>
						<button
							aria-label={'Редактировать профиль'}
							className={
								'p-1.5 text-white outline-1 outline-white transition-opacity hover:opacity-60'
							}
							type={'button'}
							onClick={() => setIsEditProfileModalOpen(true)}
						>
							<EditIcon />
						</button>
					</div>
					<p className={'text-lg'} title={user.about}>
						{user.about}
					</p>
				</div>
			</div>
			<button
				aria-label={'Добавить карточку'}
				className={
					'flex w-full justify-center border-2 border-white px-16 py-2 text-center text-white transition-opacity hover:opacity-60 sm:w-fit sm:py-3.5'
				}
				type={'button'}
				onClick={() => setIsAddCardModalOpen(true)}
			>
				<AddIcon />
			</button>
			{isUpdateAvatarModalOpen && (
				<AvatarModal onClose={() => setIsUpdateAvatarModalOpen(false)} />
			)}
			{isEditProfileModalOpen && (
				<ProfileModal
					user={user}
					onClose={() => setIsEditProfileModalOpen(false)}
				/>
			)}
			{isAddCardModalOpen && (
				<NewCardModal onClose={() => setIsAddCardModalOpen(false)} />
			)}
		</section>
	);
}
