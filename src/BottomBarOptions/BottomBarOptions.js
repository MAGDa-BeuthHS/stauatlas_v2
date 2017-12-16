import React from 'react';
import PropTypes from 'prop-types';
import HolidayDatePicker from '../HolidayDatePicker/HolidayDatePicker';
import DayFilter from '../DayFilter/DayFilter';
import './bottom-bar-options.css';



const propTypes = {
	handleOnDateClick: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

const BottomBarOptions = (props) => {
	const { selected, handleOnDateClick } = props;

	if( selected === 'general') {
		return (

			<DayFilter setFilter={()=>{}}/>
		);
	} else if(selected === 'period') {
		return(
			<HolidayDatePicker
				handleChangeDateStart={handleOnDateClick}
				handleChangeDateEnd={handleOnDateClick}
			/>
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