import React from 'react';
import PropTypes from 'prop-types';
import HolidayDatePicker from '../HolidayDatePicker/HolidayDatePicker';
import './bottom-bar-options.css';



const propTypes = {
	handleOnDateClick: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

const BottomBarOptions = (props) => {
	const { selected, handleOnDateClick } = props;

	if( selected === 'general') {
		return (
			<div className="bottombar-placeholder"> Mo Di Mi Do Fr Sa So </div>
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