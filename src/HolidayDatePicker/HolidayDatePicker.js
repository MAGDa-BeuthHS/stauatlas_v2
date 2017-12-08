import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const highlightWithRanges = [
  { "react-datepicker__day--highlighted-custom-1": [
    moment().subtract(4, "days"),
    moment().subtract(3, "days"),
    moment().subtract(2, "days"),
    moment().subtract(1, "days") ]
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

const HolidayDatePicker = ({ handleOnDateClick }) => {

  return (
    <DatePicker
      locale="de-DE"
      selected={startDate}
      dateFormat="DD.MM.YYYY"
      calendarClassName="holiday-datepicker"
      placeholderText="Click to select a date"
      onChange={handleOnDateClick}
      highlightDates={highlightWithRanges}
      disabledKeyboardNavigation
    />

  );
};

    // {/* <button
    //    className="example-custom-input"
    //    onClick={this.props.onClick}>
    //    {this.props.value}
    // </button>
    // customInput={<HolidayDatePicker />}*/}

HolidayDatePicker.propTypes = propTypes;
export default HolidayDatePicker;