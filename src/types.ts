import {Dayjs} from 'dayjs';

export interface BookingType {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	toDate: string;
	fromDate: string;
	rooms: number;
}

export interface BookingForm extends Omit<BookingType, 'fromDate' | 'toDate'> {
	fromDate: undefined | Dayjs;
	toDate: undefined | Dayjs;
}
