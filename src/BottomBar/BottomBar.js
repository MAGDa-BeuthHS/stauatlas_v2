import React, { Component } from 'react';
import HolidayDatePicker from '../HolidayDatePicker/HolidayDatePicker'
import './bottom-bar.css';


class BottomBar extends Component {
	constructor(props) {
    super(props);
    this.state = {
      selected: 'actual'
    };

	 	this.handleSelectClick = this.handleSelectClick.bind(this);
	}

	handleSelectClick = (event) => {
		const selected = event.target.value;
		this.setState((prevState) => {
			if(prevState.selected !== this.state.selected) {
				return {
					selected
				}
			}
		});
	}

	render() {
		const props = {...this.props}

		const isOpen = props.isOpen;

		const openClass = isOpen && 'open';
		const arrowClass = isOpen ? 'left' : 'right';

		return(
			<div className={`box bottom-bar ${openClass}`}>

				<div className="bottom-bar-options">
					<div className="general-options-selector">
						<select
							value={this.state.selected}
							onChange={this.handleSelectClick}>
							<option value='actual'>
								Aktuelle Verkehrslage
							</option>
							<option value='general'>Generelle Verkehrslage</option>
							<option value='period'>Zeitraum Verkehrslage</option>
						</select>
						<i className="fa fa-chevron-down" aria-hidden="true" />
					</div>

					<HolidayDatePicker onDateClick={props.handleOnDateClick}/>

				</div>

				<a className="bottombar-toggle" onClick={props.handleViewSidebar}>
					<span
						className={`fa fa-2x fa-fw fa-angle-double-${arrowClass}`}
						aria-hidden="true" />
				</a>

			</div>
		)
	}
}

export default BottomBar;