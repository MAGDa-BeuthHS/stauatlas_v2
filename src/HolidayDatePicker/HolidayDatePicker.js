import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'moment/locale/de';

import 'react-datepicker/dist/react-datepicker.css';
import './holidayDatePicker.css';

import {events, holidays} from '../utils/holidays';

const highlightWithRanges = [
	{'holiday-datepicker__holiday': holidays},
	{'holiday-datepicker__event': events}
];

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

const HolidayDatePicker = ({startDate, endDate, onChangeStartDate, onChangeEndDate}) => {
	return (
		<div className="holiday-datepickers">
			<DatePicker
				selected={startDate}
				selectsStartstartDate={startDate}
				endDate={endDate}
				onChange={onChangeStartDate}
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
				onChange={onChangeEndDate}
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

HolidayDatePicker.propTypes = {
	startDate: PropTypes.object.isRequired,
	endDate: PropTypes.object.isRequired,
	onChangeStartDate: PropTypes.func.isRequired,
	onChangeEndDate: PropTypes.func.isRequired,
};

export default HolidayDatePicker;