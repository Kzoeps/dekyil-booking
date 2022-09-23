import dayjs, {Dayjs} from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
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
const createBookingQuery = (fromDate: Date, toDate: Date) => {
	return query(collection(db, 'bookings'), where('fromDate', '<=', fromDate));
}


export const checkBookingsQuery = async (values: BookingForm) => {
	const {fromDate, toDate} = getConvertedDates(values);
	const bookingQuery = createBookingQuery(fromDate, toDate);
	const bookings = await getDocs(bookingQuery);
	let roomsBooked = 0;
	bookings.forEach((booking) => {
		const bookingData = booking.data();
		if (bookingData.toDate) {
			const bookingToData = bookingData.toDate.toDate();
			dayjs.extend(isSameOrAfter)
			const convertedDate = dayjs(values.toDate).format(`YYYY/MM/DD`);
			if (dayjs(bookingToData).isSameOrAfter(convertedDate)) {
				roomsBooked += +bookingData.rooms;
			}
		}
	})
}

export const getConvertedDates = (values: BookingForm) => {
	const {fromDate, toDate} = values;
	return {
		fromDate: convertDjsToDate(fromDate as Dayjs),
		toDate: convertDjsToDate(toDate as Dayjs)
	}
}

export const createBooking = async (values: BookingForm) => {
	await checkBookingsQuery(values);
	const { fromDate , toDate } = getConvertedDates(values);
	const formattedForm = {...values, fromDate, toDate};
	// const bookingQuery = createBookingQuery(date)
	return await addDoc(collection(db, 'bookings'), formattedForm);
}
