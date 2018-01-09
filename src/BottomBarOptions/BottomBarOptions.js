import React from 'react';
import PropTypes from 'prop-types';

import HolidayDatePicker from '../HolidayDatePicker/HolidayDatePicker';
import DayFilter from '../DayFilter/DayFilter';
import { TimeFilter } from '../TimeFilter/TimeFilter';
import OptionButton from '../OptionButton/OptionButton';

import './bottom-bar-options.css';

const propTypes = {
	handleOnDateClick: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

const handleAction = () => {
	console.log('action ');
}

const BottomBarOptions = (props) => {
	const { selected, handleOnDateClick } = props;

	if (selected === 'general') {
		return (
			<div className="bottom-bar-filters">
				<DayFilter setFilter={() => {
				}}/>
				<TimeFilter/>

				<OptionButton handleAction={handleAction}/>
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

				<OptionButton handleAction={handleAction}/>
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