import {Dayjs} from 'dayjs';

export interface BookingType {
	firstName: string;
	lastName: string;
	date: string;
	rooms: number;
}

export interface BookingForm extends Omit<BookingType, 'date'> {
	date: undefined | Dayjs;
}
