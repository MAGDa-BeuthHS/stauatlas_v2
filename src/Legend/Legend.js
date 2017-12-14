import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './legend.css';


const propTypes = {
	filterTrafficByColor: PropTypes.func.isRequired,
};

class Legend extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: [ 'red', 'orange', 'yellow', 'green']
		};
	}

	setRed = () => {
		this.setState(() => ({active: ['red']}));
		this.props.filterTrafficByColor('red');
	}

	setOrange = () => {
		this.setState(() => ({active: ['orange']}));
		this.props.filterTrafficByColor('orange');
	}

	setYellow = () => {
		this.setState(() => ({active: ['yellow']}));
		this.props.filterTrafficByColor('yellow');
	}

	setGreen = () => {
		this.setState(() => ({active: ['green']}));
		this.props.filterTrafficByColor('green');
	}

	resetTrafficFilter = () => {
		this.setState(() => ({
			active: [ 'red', 'orange', 'yellow', 'green']
		}));
		this.props.filterTrafficByColor('');
	}

	render() {
		const getActiveClass = (color) => {
			if(!this.state.active.includes(color)) {
				return 'inactive';
			}
		};

		return (
			<div className="box box-legend">
				<ul className="map-legend">
					<li onClick={this.setRed}>
						<span
							className={`color-red ${getActiveClass('red')}`}
							title='stockend' />
					</li>
					<li onClick={this.setOrange}>
						<span
							className={`color-orange ${getActiveClass('orange')}`}
							title='weniger stockend' />
					</li>
					<li onClick={this.setYellow}>
						<span
							className={`color-yellow ${getActiveClass('yellow')}`}
							title='fließender' />
					</li>
					<li onClick={this.setGreen}>
						<span
							className={`color-green ${getActiveClass('green')}`}
							title='fließend' />
					</li>
					<li onClick={this.resetTrafficFilter}>
						<span
							className='color-gray'
							title='zurücksetzen' />
					</li>
				</ul>
			</div>
		);
	}
}

Legend.propTypes = propTypes;
export default Legend;