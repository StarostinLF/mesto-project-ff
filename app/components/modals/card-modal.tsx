import Image from 'next/image';

import { ICard } from '@/lib/types';

import Modal from './modal';

import CloseIcon from '@/app/icons/close-icon';

export default function CardModal({
	card,
	onClose,
}: {
	card: Pick<ICard, 'name' | 'link'>;
	onClose: () => void;
}) {
	return (
		<Modal onClose={onClose}>
			<article className={'relative flex w-fit max-w-4xl flex-col text-white'}>
				<button
					aria-label={'Закрыть'}
					className={'absolute -top-10 right-0'}
					type={'button'}
					onClick={onClose}
				>
					<CloseIcon />
				</button>
				<Image
					alt={card.name}
					className={
						'mb-4 h-auto max-h-185 w-full self-center rounded object-contain'
					}
					height={300}
					src={card.link}
					width={400}
				/>
				<h3>{card.name}</h3>
			</article>
		</Modal>
	);
}
