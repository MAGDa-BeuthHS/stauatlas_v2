import React from 'react';
import PropTypes from 'prop-types';

import HolidayDatePicker from '../HolidayDatePicker/HolidayDatePicker';
import DayFilter from '../DayFilter/DayFilter';
import {TimeFilter} from '../TimeFilter/TimeFilter';
import PlayButton from '../PlayButton/PlayButton';

import './bottom-bar-options.css';

const BottomBarOptions = (props) => {
	const {selected, datePicker, timeFilter, isPlaying, togglePlaying, setDayFilter} = props;

	if (selected === 'general') {
		return (
			<div className="bottom-bar-filters">
				<DayFilter setFilter={setDayFilter}/>
				<TimeFilter {...timeFilter}/>

				<PlayButton
					isPlaying={isPlaying}
					togglePlaying={togglePlaying}/>
			</div>
		);
	} else if (selected === 'period') {
		return (
			<div className="bottom-bar-filters">
				<HolidayDatePicker
					{...datePicker}
				/>
				<TimeFilter {...timeFilter}/>

				<PlayButton
					isPlaying={isPlaying}
					togglePlaying={togglePlaying}/>
			</div>
		);
	} else {
		/*actual*/
		return (
			<div className="bottombar-placeholder"/>
		);
	}
};

BottomBarOptions.propTypes = {
	datePicker: PropTypes.shape(HolidayDatePicker.propTypes).isRequired,
	timeFilter: PropTypes.shape(TimeFilter.propTypes).isRequired,
	setDayFilter: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
	isPlaying: PropTypes.bool.isRequired,
	togglePlaying: PropTypes.func.isRequired,
};

export default BottomBarOptions;