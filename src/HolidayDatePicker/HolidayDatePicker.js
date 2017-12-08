import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const highlightWithRanges = [
  { "react-datepicker__day--highlighted-custom-1": [
    moment("23.12.2017", "DD.MM.YYYY"),
    moment("24.12.2017", "DD.MM.YYYY"),
    moment("25.12.2017", "DD.MM.YYYY"),
    moment("26.12.2017", "DD.MM.YYYY"),
    moment("27.12.2017", "DD.MM.YYYY"),
    moment("28.12.2017", "DD.MM.YYYY"),
    moment("29.12.2017", "DD.MM.YYYY"),
    moment("30.12.2017", "DD.MM.YYYY"),
    moment("31.12.2017", "DD.MM.YYYY"),
    moment("01.01.2018", "DD.MM.YYYY"),
    moment("02.01.2018", "DD.MM.YYYY"),]
  },
  { "react-datepicker__day--highlighted-custom-2": [
    moment().add(1, "days"),
    moment().add(2, "days"),
    moment().add(3, "days"),
    moment().add(4, "days") ]
  }
]
const startDate = moment();

const propTypes = {
  handleOnDateClick: PropTypes.func.isRequired,
};

const HolidayDatePicker = ({ onDateClick }) => {

  return (
      <DatePicker
        locale="de"
        selected={startDate}
        dateFormat="DD.MM.YYYY"
        calendarClassName="holiday-datepicker"
        placeholderText="Click to select a date"
        onChange={onDateClick}
        highlightDates={highlightWithRanges}
        disabledKeyboardNavigation
      />
  )
}

HolidayDatePicker.propTypes = propTypes;
export default HolidayDatePicker;