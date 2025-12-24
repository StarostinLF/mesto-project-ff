import { SVGProps } from 'react';

export type TIcon = Omit<SVGProps<SVGSVGElement>, 'color'> & {
	size?: number | string;
	color?: string;
};

export type TLogo = Omit<SVGProps<SVGSVGElement>, 'color'> & {
	color?: string;
};

export interface IUser {
	_id: string;
	name: string;
	about: string;
	avatar: string;
	cohort: string;
}

export interface ICard {
	_id: string;
	name: string;
	link: string;
	owner: IUser;
	likes: IUser[];
	createdAt: string;
}

export interface IProfile {
	name: string;
	description: string;
	avatarUrl: string;
	onAddClick?: () => void;
}

export interface IResponse {
	success: boolean;
	message: string;
	user?: IUser;
	card?: ICard;
	cards?: ICard[];
}
