import Logo from '@/app/icons/logo';

export default function Header() {
	return (
		<header
			className={'border-color border-b border-neutral-600 px-2 py-10 sm:px-0'}
		>
			<Logo />
		</header>
	);
}
