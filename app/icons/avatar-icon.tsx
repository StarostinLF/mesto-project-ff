import { TIcon } from '@/lib/types';

export default function AvatarIcon({
	size = 26,
	color = '#fff',
	...props
}: TIcon) {
	return (
		<svg
			fill={'none'}
			height={size}
			viewBox={'0 0 26 26'}
			width={size}
			xmlns={'http://www.w3.org/2000/svg'}
			{...props}
		>
			<path
				d={
					'M26 3.454 6.77 22.794 3.336 19.29 22.517 0 26 3.454ZM0 26l5.102-1.53-3.581-3.453L0 26Z'
				}
				fill={color}
			/>
		</svg>
	);
}
