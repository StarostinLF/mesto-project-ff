import { TIcon } from '@/lib/types';

export default function EditIcon({
	size = 10,
	color = '#fff',
	...props
}: TIcon) {
	return (
		<svg
			fill={'none'}
			height={size}
			viewBox={'0 0 10 10'}
			width={size}
			xmlns={'http://www.w3.org/2000/svg'}
			{...props}
		>
			<path
				d={
					'M10 1.328 2.604 8.767 1.283 7.419 8.66 0 10 1.328ZM0 10l1.962-.588L.585 8.083 0 10Z'
				}
				fill={color}
			/>
		</svg>
	);
}
