import React from 'react';
import './App.css';
import {Field, Form, Formik} from 'formik';
import {Select, TextField} from 'formik-mui';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {Button, MenuItem, Stack, TextField as MuiTextField} from '@mui/material';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {BookingForm} from './types';
import {createBooking} from './utils';

function App() {
	const initValues: BookingForm = {
		firstName: '',
		phoneNumber: '',
		email: '',
		lastName: '',
		toDate: undefined,
		fromDate: undefined,
		rooms: 1
	};

	const getRoomSelects = (): React.ReactElement[] => {
		return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((room) => <MenuItem key={room}
																				   value={room}>{room}</MenuItem>);
	};

	const handleBookingSubmission = async (values: BookingForm) => {
		await createBooking(values);
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div style={{width: '100%', height: '80px',  boxShadow: '0 2px 25px 2px gray'}}>
				Dekyil Guest House
			</div>
			<Formik initialValues={initValues} onSubmit={handleBookingSubmission}>
				{(formik) => (
					<Form>
						<Stack spacing={2} padding={5} mt={10}>
							<Field label={'First Name'} name={'firstName'} component={TextField}/>
							<Field label={'Last Name'} name={'lastName'} component={TextField}/>
							<Field label={'Email'} name={'email'} component={TextField}/>
							<Field label={'Phone number'} name={'phoneNumber'} component={TextField}/>
							<Field label={'Number of rooms'} name={'rooms'} component={Select}>
								{getRoomSelects()}
							</Field>

							<DatePicker
								label="Reservation Date from"
								inputFormat={'DD/MM/YYYY'}
								value={formik.values.fromDate}
								onChange={(newValue) => {
									formik.setFieldValue('fromDate', newValue);
								}}
								renderInput={(params) => <MuiTextField {...params} />}
							/>
							<DatePicker
								label="Reservation Date to"
								inputFormat={'DD/MM/YYYY'}
								value={formik.values.toDate}
								onChange={(newValue) => {
									formik.setFieldValue('toDate', newValue);
								}}
								renderInput={(params) => <MuiTextField {...params} />}
							/>
							<Button variant={'contained'} type="submit">
								Submit
							</Button>
						</Stack>
							</Form>
						)}
					</Formik>
		</LocalizationProvider>
	);
}

export default App
