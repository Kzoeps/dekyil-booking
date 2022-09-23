import dayjs, {Dayjs} from 'dayjs';
import {BookingForm} from './types';
import { where, getDocs,collection, addDoc, query }from 'firebase/firestore';
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
const createBookingQuery = (date: Date) => {
	return query(collection(db, 'bookings'), where('date', '==', date));
}


export const checkBookingsQuery = async (values: BookingForm) => {
	const date = convertDjsToDate(values.fromDate as Dayjs);
	const bookingQuery = createBookingQuery(date);
	const bookings = await getDocs(bookingQuery)
	debugger;
}

export const getConvertedDates = (values: BookingForm) => {
	const {fromDate, toDate} = values;
	return {
		fromDate: convertDjsToDate(fromDate as Dayjs),
		toDate: convertDjsToDate(toDate as Dayjs)
	}
}

export const createBooking = async (values: BookingForm) => {
	// await checkBookingsQuery(values);
	const { fromDate , toDate } = getConvertedDates(values);
	const formattedForm = {...values, fromDate, toDate};
	// const bookingQuery = createBookingQuery(date)
	return await addDoc(collection(db, 'bookings'), formattedForm);
}
