import React from 'react';
import PropTypes from 'prop-types';

import HolidayDatePicker from '../HolidayDatePicker/HolidayDatePicker';
import DayFilter from '../DayFilter/DayFilter';
import { TimeFilter } from '../TimeFilter/TimeFilter';

import './bottom-bar-options.css';

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
				<a className="play-selected">
					<span className="fa fa-fw fa-2x fa-play"/>
				</a>
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
				<a className="play-selected">
					<span className="fa fa-fw fa-2x fa-play"/>
				</a>
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