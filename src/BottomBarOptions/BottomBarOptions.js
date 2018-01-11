import React from 'react';
import PropTypes from 'prop-types';

import HolidayDatePicker from '../HolidayDatePicker/HolidayDatePicker';
import DayFilter from '../DayFilter/DayFilter';
import {TimeFilter} from '../TimeFilter/TimeFilter';
import PlayButton from '../PlayButton/PlayButton';

import './bottom-bar-options.css';

const propTypes = {
	handleOnDateClick: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
	isPlaying: PropTypes.bool.isRequired,
	togglePlaying: PropTypes.func.isRequired,
};

const BottomBarOptions = (props) => {
	const {selected, handleOnDateClick, isPlaying, togglePlaying} = props;

	if (selected === 'general') {
		return (
			<div className="bottom-bar-filters">
				<DayFilter setFilter={() => {
				}}/>
				<TimeFilter/>

				<PlayButton
					isPlaying={isPlaying}
					togglePlaying={togglePlaying}/>
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

BottomBarOptions.propTypes = propTypes;

export default BottomBarOptions;