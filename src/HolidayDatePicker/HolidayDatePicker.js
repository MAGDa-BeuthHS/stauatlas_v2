import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/de';

import 'react-datepicker/dist/react-datepicker.css';
import './holidayDatePicker.css';

import  { holidays, events } from '../utils/holidays';

const highlightWithRanges = [
	{ 'holiday-datepicker__holiday': holidays },
	{ 'holiday-datepicker__event': events }
];

const startDate = moment();
const endDate = moment().add(7, 'days');

const propTypes = {
	handleChangeDateStart: PropTypes.func.isRequired,
	handleChangeDateEnd: PropTypes.func.isRequired,
};

const HolidayDatePickerLegend = () => (
	<div className="holiday-datepicker-legend">
		<div>
			<span className="legend-holiday"/>
			Ferien und Feiertage
		</div>
		<div>
			<span className="legend-event"/>
			Veranstaltungen
		</div>
	</div>
);

const HolidayDatePicker = ({handleChangeDateStart, handleChangeDateEnd}) => {
	return (
		<div className="holiday-datepickers">
			<DatePicker
				selected={startDate}
				selectsStartstartDate={startDate}
				endDate={endDate}
				onChange={handleChangeDateStart}
				dateFormat="DD.MM.YYYY"
				calendarClassName="holiday-datepicker"
				placeholderText="Click to select a date"
				highlightDates={highlightWithRanges}
				locale='de'
				disabledKeyboardNavigation
			>
				<HolidayDatePickerLegend />
			</DatePicker>

			<DatePicker
				selected={endDate}
				selectsEnd
				startDate={startDate}
				endDate={endDate}
				onChange={handleChangeDateEnd}
				dateFormat="DD.MM.YYYY"
				calendarClassName="holiday-datepicker"
				placeholderText="Click to select a date"
				highlightDates={highlightWithRanges}
				locale='de'
				disabledKeyboardNavigation
			>
				<HolidayDatePickerLegend />
			</DatePicker>
		</div>
	);
};

HolidayDatePicker.propTypes = propTypes;
export default HolidayDatePicker;