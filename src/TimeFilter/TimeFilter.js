import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './time-filter.css';

const fullLength = 168;
const hoursCount = 24;
const originLength = 7;
const scale = fullLength / hoursCount;
const minHoursDiffToShowOnSameLine = 5;

const capHours = hours => {
	if (hours < 0) {
		return 0;
	}

	if (hours > 24) {
		return 24;
	}

	return Math.floor(hours * 4) / 4;
};

export class TimeFilter extends Component {

	constructor(props) {
		super(props);

		this.onStart = this.onStart.bind(this);
		this.onEnd = this.onEnd.bind(this);
		this.onMove = this.onMove.bind(this);

		this.started = false;

		this.mouseHandlers = {
			onStart: this.onStart,
			onEnd: this.onEnd,
			onMove: this.onMove,
		};
	}

	onStart(e) {
		e.preventDefault();

		const hours = this.convertXToHours(e.pageX);

		this.updateStart(hours);
	}

	onMove(e) {
		e.preventDefault();

		if (!this.started) {
			return;
		}

		const hours = this.convertXToHours(e.pageX);
		this.updateEnd(hours);
	}

	onEnd(e) {
		e.preventDefault();

		const hours = this.convertXToHours(e.pageX);
		this.updateEnd(hours);

		this.started = false;
	}

	updateStart(hours) {
		hours = capHours(hours);

		this.props.onChangeStart(hours);
		this.props.onChangeEnd(hours);

		this.started = true;
	}

	updateEnd(hours) {
		hours = capHours(hours);
		if (hours > this.props.start) {
			this.props.onChangeEnd(hours);
		} else {
			this.props.onChangeStart(hours);
		}
	}

	convertXToHours(x) {
		const pixels = x - this.target.offsetLeft - originLength;
		return pixels / scale;
	}

	render() {
		const {start, end} = this.props;

		return <div className="time-filter-container">
			<TimeRangeLabels start={start} end={end}/>

			<div
				className="time-filter"
				ref={target => this.target = target}
				onDrag={e => e.preventDefault()}
				onMouseDown={this.onStart}
				onMouseMove={this.onMove}
				onMouseUp={this.onEnd}
			>

			</div>

			<Selection start={start} end={end} mouseHandlers={this.mouseHandlers}/>

			<Scales/>

			<ScaleHours/>
		</div>;
	}

}

TimeFilter.propTypes = {
	start: PropTypes.number.isRequired,
	end: PropTypes.number.isRequired,
	onChangeStart: PropTypes.func.isRequired,
	onChangeEnd: PropTypes.func.isRequired,
};

const Scales = () =>
	<div className="scales">
		<div className="scale"/>
		<div className="scale"/>
		<div className="scale"/>
		<div className="scale"/>

		<div className="scale"/>
		<div className="scale"/>
		<div className="scale"/>
		<div className="scale"/>

		<div className="scale"/>
		<div className="scale"/>
		<div className="scale"/>
		<div className="scale"/>

		<div className="scale"/>
		<div className="scale"/>
		<div className="scale"/>
		<div className="scale"/>

		<div className="scale"/>
		<div className="scale"/>
		<div className="scale"/>
		<div className="scale"/>

		<div className="scale"/>
		<div className="scale"/>
		<div className="scale"/>
		<div className="scale"/>

		<div className="scale"/>
	</div>;

const ScaleHours = () =>
	<div className="scale-hours">
		<div className="scale-hour">00:00</div>
		<div className="scale-hour">06:00</div>
		<div className="scale-hour">12:00</div>
		<div className="scale-hour">18:00</div>
		<div className="scale-hour">23:59</div>
	</div>;

const Selection = ({start, end, mouseHandlers}) => {
	const length = end - start;

	return <div
		className="selection"
		style={{left: scale * start + 'px', width: scale * length + 'px'}}
		onDrag={e => e.preventDefault()}
		onMouseDown={mouseHandlers.onStart}
		onMouseUp={mouseHandlers.onEnd}
		onMouseMove={mouseHandlers.onMove}
	>
	</div>;
};

Selection.propTypes = {
	start: PropTypes.number,
	end: PropTypes.number,
	mouseHandlers: PropTypes.shape({
		onStart: PropTypes.func,
		onEnd: PropTypes.func,
		onMove: PropTypes.func,
	}),
};

const formatTwoDigitNumber = number => {
	if (number < 10) {
		return `0${number}`;
	}

	return `${number}`;
};

const formatHours = hours => {
	const fullHours = Math.floor(hours);
	const minutes = (hours - fullHours) * 60;

	return `${formatTwoDigitNumber(fullHours)}:${formatTwoDigitNumber(minutes)}`;
};

const TimeRangeLabels = ({start, end}) => {
	const length = end - start;
	const bump = length < minHoursDiffToShowOnSameLine ? 'bump' : '';

	return <div className="time-range-labels">
		<div
			className="time-range-label"
			style={{left: scale * start + 'px'}}
		>
			{formatHours(start)}
		</div>

		<div
			className={`time-range-label ${bump}`}
			style={{left: scale * end + 'px'}}
		>
			{formatHours(end)}
		</div>
	</div>;
};

TimeRangeLabels.propTypes = {
	start: PropTypes.number.isRequired,
	end: PropTypes.number.isRequired,
};
