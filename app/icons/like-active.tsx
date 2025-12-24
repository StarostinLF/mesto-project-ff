import { TIcon } from '@/lib/types';

export default function LikeActiveIcon({
	size = 21,
	color = '#000',
	...props
}: TIcon) {
	return (
		<svg
			fill={'none'}
			height={typeof size === 'number' ? 19 : size}
			viewBox={'0 0 21 19'}
			width={size}
			xmlns={'http://www.w3.org/2000/svg'}
			{...props}
		>
			<path
				d={
					'M19.154 9.338c2.14-2.14 2.14-5.614 0-7.733a5.486 5.486 0 0 0-7.755 0l-1.038 1.06-1.038-1.039C7.183-.535 3.708-.535 1.589 1.605A5.43 5.43 0 0 0 0 5.482c0 1.462.572 2.84 1.59 3.877l8.771 8.772 8.793-8.793Z'
				}
				fill={color}
			/>
		</svg>
	);
}
