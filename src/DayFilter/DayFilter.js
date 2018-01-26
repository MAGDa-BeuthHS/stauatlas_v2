import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './day-filter.css';

// TODO: pass activeFilter and set as required
const propTypes = {
	setFilter: PropTypes.func.isRequired
};

class DayFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			weekDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
			activeFilter: null
		};

		this.handleSetFilter = this.handleSetFilter.bind(this);
	}

	handleSetFilter = (activeFilter) => {
		this.setState((prevState) => {
			if( prevState.activeFilter !== activeFilter) {
				return { activeFilter };
			}
		});
		this.props.setFilter(activeFilter);
	};

	render() {
		return (
			<div className="day-filter">
				{this.state.weekDays.map((day, dayIndex) => {
					return (
						<span
							onClick={this.handleSetFilter.bind(this, dayIndex)}
							key={dayIndex}
							className={`filter ${dayIndex === this.state.activeFilter && 'active'}`}
						>
							{day}
						</span>
					);
				})}
			</div>
		);
	}
}


DayFilter.propTypes = propTypes;
export default DayFilter;
