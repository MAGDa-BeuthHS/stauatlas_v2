import React from 'react';
import PropTypes from 'prop-types';
import HolidayDatePicker from '../HolidayDatePicker/HolidayDatePicker';
import DayFilter from '../DayFilter/DayFilter';
import './bottom-bar-options.css';
import { TimeFilter } from '../TimeFilter/TimeFilter';

const propTypes = {
	handleOnDateClick: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

const BottomBarOptions = (props) => {
	const { selected, handleOnDateClick } = props;

	if (selected === 'general') {
		return (
			<div className="bottom-bar-filters">
				<DayFilter setFilter={() => {
				}}/>
				<TimeFilter/>
			</div>
		);
	} else if (selected === 'period') {
		return (
			<div className="bottom-bar-filters">
				<HolidayDatePicker
					handleChangeDateStart={handleOnDateClick}
					handleChangeDateEnd={handleOnDateClick}
				/>
				<TimeFilter/>
			</div>
		);
	} else {
		/*actual*/
		return (
			<div className="bottombar-placeholder"/>
		);
	}
};

BottomBarOptions.propTypes = propTypes;
export default BottomBarOptions;