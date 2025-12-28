'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ICard, IUser } from '@/lib/types';
import { dislikeCard, likeCard } from '@/lib/fetch-functions/cards';

import SafeImage from './safe-image';
import CardModal from './modals/card-modal';

import LikeInactiveIcon from '@/app/icons/like-inactive';
import LikeActiveIcon from '@/app/icons/like-active';

export default function Card({
	card,
	user,
}: {
	card: Pick<ICard, '_id' | 'name' | 'link' | 'likes'>;
	user: Pick<IUser, '_id'>;
}) {
	const isLikedInitial = card.likes.some((like) => like._id === user._id);

	const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);
	const [isLiked, setIsLiked] = useState<boolean>(isLikedInitial);
	const [likeError, setLikeError] = useState<string>('');

	const router = useRouter();

	const userIds = card.likes.map((like) => like._id);

	async function handleLikeCard() {
		setIsLiked(!isLiked);

		try {
			if (isLiked) await dislikeCard({ _id: card._id });
			else await likeCard({ _id: card._id });
		} catch (error) {
			setLikeError(
				error instanceof Error ? error.message : 'Ошибка при лайке карточки',
			);

			setIsLiked(isLiked);
		} finally {
			router.refresh();
		}
	}

	return (
		<article
			className={'flex w-70 flex-col justify-center overflow-hidden rounded-lg'}
		>
			<SafeImage
				alt={card.name}
				setModalOpen={() => setIsCardModalOpen(true)}
				src={card.link}
			/>
			<div
				className={
					'flex items-center justify-between bg-white px-8 py-5 text-black'
				}
			>
				<h3 className={'text-lg font-bold'}>{card.name}</h3>
				<button
					aria-label={
						userIds.includes(user._id) ? 'Убрать лайк' : 'Лайкнуть карточку'
					}
					className={'flex flex-col justify-center gap-1'}
					type={'button'}
					onClick={handleLikeCard}
				>
					{userIds.includes(user._id) ? (
						<LikeActiveIcon
							aria-hidden={true}
							color={likeError ? 'red' : 'black'}
							size={24}
						/>
					) : (
						<LikeInactiveIcon
							aria-hidden={true}
							color={likeError ? 'red' : 'black'}
							size={24}
						/>
					)}
					{card.likes.length && <span>{card.likes.length}</span>}
				</button>
			</div>
			{isCardModalOpen && (
				<CardModal card={card} onClose={() => setIsCardModalOpen(false)} />
			)}
		</article>
	);
}
