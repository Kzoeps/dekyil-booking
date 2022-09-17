import React, {useState} from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import {Field, Form, Formik} from 'formik';
import {Select, TextField} from 'formik-mui';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {Button, MenuItem, TextField as MuiTextField} from '@mui/material';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import dayjs, {Dayjs} from 'dayjs';

function App() {
	const [count, setCount] = useState(0);
	const initValues = {
		firstName: '',
		lastName: '',
		date: '',
		rooms: 1
	};

	const getRoomSelects = (): React.ReactElement[] => {
		return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((room) => <MenuItem key={room}
																				   value={room}>{room}</MenuItem>);
	};

	const convDateToReadable = (date: Dayjs): string => {
		const stringiDate = dayjs(date).format(`DD/MM/YYYY`);
		return stringiDate;
	};

	const convStringToDate = (date: string): Dayjs => {
		return dayjs(date, 'DD/MM/YYYY');
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div className="App">
				<div>
					<a href="https://vitejs.dev" target="_blank">
						<img src="/vite.svg" className="logo" alt="Vite logo"/>
					</a>
					<a href="https://reactjs.org" target="_blank">
						<img src={reactLogo} className="logo react" alt="React logo"/>
					</a>
				</div>
				<h1>Vite + React</h1>
				<div>
					<Formik initialValues={initValues} onSubmit={(values) => {
						console.log(convDateToReadable(values.date as unknown as Dayjs));
					}}>
						{(formik) => (
							<Form>
								<Field label={'First Name'} name={'firstName'} component={TextField}/>
								<Field label={'Last Name'} name={'lastName'} component={TextField}/>
								<Field label={'Number of rooms'} name={'rooms'} component={Select}>
									{getRoomSelects()}
								</Field>

								<DatePicker
									label="Reservation Date"
									inputFormat={'DD/MM/YYYY'}
									value={formik.values.date}
									onChange={(newValue) => {
										formik.setFieldValue('date', newValue);
									}}
									renderInput={(params) => <MuiTextField {...params} />}
								/>
								<Button type="submit">
									Submit
								</Button>
							</Form>
						)}
					</Formik>
				</div>
				<div className="card">
					<button onClick={() => setCount((count) => count + 1)}>
						count is {count}
					</button>
					<p>
						Edit <code>src/App.tsx</code> and save to test HMR
					</p>
				</div>
				<p className="read-the-docs">
					Click on the Vite and React logos to learn more
				</p>
			</div>
		</LocalizationProvider>
	);
}

export default App
