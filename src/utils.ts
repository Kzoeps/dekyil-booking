import dayjs, {Dayjs} from 'dayjs';
import {BookingForm} from './types';

export const convDateToReadable = (date: Dayjs): string => {
	const stringiDate = dayjs(date).format(`DD/MM/YYYY`);
	return stringiDate;
};

export const convStringToDate = (date: string): Dayjs => {
	return dayjs(date, 'DD/MM/YYYY');
};

export const createBooking = (values: BookingForm) => {
	const date = convDateToReadable(values.date as Dayjs);
	console.log({...values, date});
}
