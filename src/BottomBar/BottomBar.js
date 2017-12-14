import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HolidayDatePicker from '../HolidayDatePicker/HolidayDatePicker';
import './bottom-bar.css';

const GENERAL = 'general';
const PERIOD = 'period';
const ACTUAL = 'actual';

const propTypes = {
	isOpen: PropTypes.bool.isRequired,
	handleOnDateClick: PropTypes.func.isRequired,
	handleViewSidebar: PropTypes.func.isRequired,
};
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
			return {selected: selected};
		});
	};

	renderOptions() {
		switch (this.state.selected) {
		case GENERAL:
			return (<div className="bottombar-placeholder">Mo Di Mi Do Fr Sa So</div>);
		case PERIOD:
			return (
				<HolidayDatePicker onDateClick={this.props.handleOnDateClick}/>
			);
		default:
			return <div className="bottombar-placeholder"/>;
		}
	}

	render() {
		const isOpen = this.props.isOpen;

		const openClass = isOpen && 'open';
		const openControlClass = !isOpen && 'open';
		const arrowClass = isOpen ? 'left' : 'right';

		return (
			<div className="bottom-bar-container">
				<div className={`box bottom-bar ${openClass}`}>

					<div className="bottom-bar-options">
						<div className="general-options-selector">
							<select
								value={this.state.selected}
								onChange={this.handleSelectClick}>
								<option value={ACTUAL}>Aktuelle Verkehrslage</option>
								<option value={GENERAL}>Generelle Verkehrslage</option>
								<option value={PERIOD}>Zeitraum Verkehrslage</option>
							</select>
							<i className="fa fa-chevron-down" aria-hidden="true"/>
						</div>

						{this.renderOptions()}

					</div>

					<a className="bottombar-toggle" onClick={this.props.handleViewSidebar}>
						<span
							className={`fa fa-2x fa-fw fa-angle-double-${arrowClass}`}
							aria-hidden="true"/>
					</a>
				</div>

				<div className={`box bottom-bar ${openControlClass}`}>
					<a className="bottombar-toggle" onClick={this.props.handleViewSidebar}>
						<span
							className={`fa fa-2x fa-fw fa-angle-double-${arrowClass}`}
							aria-hidden="true"/>
					</a>
				</div>

			</div>
		);
	}
}

BottomBar.propTypes = propTypes;
export default BottomBar;