import { TIcon } from '@/lib/types';

export default function CloseIcon({
	size = 28,
	color = '#fff',
	...props
}: TIcon) {
	return (
		<svg
			fill={'none'}
			height={typeof size === 'number' ? 27 : size}
			viewBox={'0 0 28 27'}
			width={size}
			xmlns={'http://www.w3.org/2000/svg'}
			{...props}
		>
			<path
				d={'m1.939 25.939 24-24M2.061 1.939l24 24'}
				stroke={color}
				strokeWidth={3}
			/>
		</svg>
	);
}
