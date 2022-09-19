import dayjs, {Dayjs} from 'dayjs';
import {BookingForm} from './types';
import { collection, addDoc }from 'firebase/firestore';
import {db} from './firebase-conf';

export const convDateToReadable = (date: Dayjs): string => {
	const stringiDate = dayjs(date).format(`DD/MM/YYYY`);
	return stringiDate;
};

export const convStringToDate = (date: string): Dayjs => {
	return dayjs(date, 'DD/MM/YYYY');
};

export const convertDjsToDate = (date: Dayjs): Date => {
	return dayjs(date).toDate();
}

export const createBooking = async (values: BookingForm) => {
	const date = convertDjsToDate(values.date as Dayjs);
	const formattedForm = {...values, date};
	return await addDoc(collection(db, 'bookings'), formattedForm);
}
