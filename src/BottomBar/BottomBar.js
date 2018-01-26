import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BottomBarOptions from '../BottomBarOptions/BottomBarOptions';
import './bottom-bar.css';
import HolidayDatePicker from '../HolidayDatePicker/HolidayDatePicker';
import {TimeFilter} from '../TimeFilter/TimeFilter';

const GENERAL = 'general';
const PERIOD = 'period';
const ACTUAL = 'actual';

class BottomBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: ACTUAL
		};

		this.handleSelectClick = this.handleSelectClick.bind(this);
	}

	handleSelectClick = (event) => {
		const selected = event.target.value;
		this.setState(() => {
			return {selected};
		});
	};

	render() {
		const {isOpen, isPlaying, togglePlaying, datePicker, timeFilter, setDayFilter} = this.props;

		const openClass = isOpen ? 'open' : 'closed';
		const arrowClass = isOpen ? 'left' : 'right';

		return (
			<div className="bottom-bar-container">
				<div className={`box bottom-bar ${openClass} ${this.state.selected}`}>
					<div className="bottom-bar-content">
						<div className="general-options-selector">
							<select
								value={this.state.selected}
								onChange={this.handleSelectClick}>
								<option value={ACTUAL}>Aktuelle Verkehrslage</option>
								<option value={GENERAL}>Generelle Verkehrslage</option>
								<option value={PERIOD}>Zeitraum Verkehrslage</option>
							</select>
							<i className="fa fa-fw fa-chevron-down" aria-hidden="true"/>
						</div>

						<BottomBarOptions
							selected={this.state.selected}
							datePicker={datePicker}
							setDayFilter={setDayFilter}
							timeFilter={timeFilter}
							isPlaying={isPlaying}
							togglePlaying={togglePlaying}
						/>
					</div>

					<div className="bottombar-toggle">
						<a onClick={this.props.handleViewSidebar}>
							<span
								className={`fa fa-2x fa-fw fa-angle-double-${arrowClass}`}
								aria-hidden="true"/>
						</a>
					</div>
				</div>

			</div>
		);
	}
}

BottomBar.propTypes = {
	datePicker: PropTypes.shape(HolidayDatePicker.propTypes).isRequired,
	timeFilter: PropTypes.shape(TimeFilter.propTypes).isRequired,
	setDayFilter: PropTypes.func.isRequired,
	handleViewSidebar: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	isPlaying: PropTypes.bool.isRequired,
	togglePlaying: PropTypes.func.isRequired,
};

export default BottomBar;