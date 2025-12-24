import { TIcon } from '@/lib/types';

export default function AddIcon({
	size = 14,
	color = '#fff',
	...props
}: TIcon) {
	return (
		<svg
			fill={'none'}
			height={size}
			viewBox={'0 0 22 22'}
			width={size}
			xmlns={'http://www.w3.org/2000/svg'}
			{...props}
		>
			<path
				d={
					'M22 9.778h-9.778V0H9.778v9.778H0v2.444h9.778V22h2.444v-9.778H22V9.778Z'
				}
				fill={color}
			/>
		</svg>
	);
}
