import { getUser } from '@/lib/fetch-functions/user';
import { getCards } from '@/lib/fetch-functions/cards';

import { Profile } from './components/profile';
import Card from './components/card';

export default async function App() {
	const user = await getUser();
	const cards = await getCards();

	return (
		<main className={'flex-auto px-2 sm:px-0'}>
			<Profile user={user} />
			<ul className={'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'}>
				{cards.map((card) => (
					<li key={card._id} className={'flex justify-center'}>
						<Card card={card} user={user} />
					</li>
				))}
			</ul>
		</main>
	);
}
