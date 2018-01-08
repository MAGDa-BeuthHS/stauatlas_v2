import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	handleAction: PropTypes.func.isRequired,
};


class OptionButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			play: true
		};
	}

	// reset play on changing the select
	componentWillReceiveProps() {
		this.setState(() => {
			return { play: true };
		});
	}

	togglePlay = () => {
		this.setState(() => {
			return { play: !this.state.play };
		});

		this.props.handleAction(this.state.play);
	}


	render() {
		return (
			<a
				className="play-selected"
				onClick={this.togglePlay}>
				<span
					className={`fa fa-fw fa-lg fa-${this.state.play ? 'play' : 'pause'}`}
				/>
			</a>
		);
	}
}

OptionButton.propTypes = propTypes;
export default OptionButton;