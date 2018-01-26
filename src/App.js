import React, {Component} from 'react';
import './App.css';

import {MapView} from './MapView/MapView';
import BottomBar from './BottomBar/BottomBar';
import {getAllTrafficSensors, getTrafficProgressForDuration} from './trafficService';
import moment from 'moment';
import {CurrentPlayDate} from './CurrentPlayDate/CurrentPlayDate';

const zoomRadius = {
	11: 170,
	12: 150,
	13: 130,
	14: 80,
	15: 40,
	16: 20,
	17: 10,
	18: 5
};

export class App extends Component {
	static setColor(traffic) {
		return traffic.map((t) => {
			if (Math.round(t.relativeSpeed) >= 85) {
				t.color = 'green';
			} else if (Math.round(t.relativeSpeed) < 85 && Math.round(t.relativeSpeed) >= 60) {
				t.color = 'yellow';
			} else if (Math.round(t.relativeSpeed) < 60 && Math.round(t.relativeSpeed) >= 50) {
				t.color = 'orange';
			} else if (Math.round(t.relativeSpeed) < 50) {
				t.color = 'red';
			}
			return t;
		});
	}

	constructor(props) {
		super(props);
		this.state = {
			bottomBarOpen: false,
			circleRadius: 170,
			traffic: [],
			filteredTraffic: [],
			dresdenPosition: [51.050407, 13.737262],
			fetchingPosition: false,
			position: undefined,
			isPlaying: false,
			playData: null,
			playDate: null,
			startDate: moment(),
			endDate: moment().add(7, 'days'),
			startHour: 9,
			endHour: 18,
		};

		this.filterTrafficByColor = this.filterTrafficByColor.bind(this);
		this.resetTraffic = this.resetTraffic.bind(this);
		this.handleViewSidebar = this.handleViewSidebar.bind(this);
		this.onChangeStartDate = this.onChangeStartDate.bind(this);
		this.onChangeEndDate = this.onChangeEndDate.bind(this);
		this.onChangeStartHour = this.onChangeStartHour.bind(this);
		this.onChangeEndHour = this.onChangeEndHour.bind(this);
		this.handleMapZoom = this.handleMapZoom.bind(this);
		this.togglePlaying = this.togglePlaying.bind(this);
		this.setDayFilter = this.setDayFilter.bind(this);

		this.play = this.play.bind(this);
		setInterval(this.play, 1000);
	}

	componentWillMount() {
		if (typeof window !== 'object') return;
		if (!('geolocation' in window.navigator)) return;

		this.getCurrentPosition();
	}

	componentWillUnmount() {
		this.willUnmount = true;
	}

	componentDidMount() {
		getAllTrafficSensors()
			.then((traffic) => {
				App.setColor(traffic);

				this.setState((prevState) => {
					if (prevState.traffic !== traffic) {
						return {
							filteredTraffic: traffic,
							traffic,
						};
					}

					return prevState;
				});
			});
	}

	getCurrentPosition = () => {
		this.setState({fetchingPosition: true});

		return window.navigator.geolocation.getCurrentPosition(
			position => {
				if (this.willUnmount) return;
				this.setState((prevState) => {
					if (prevState.position !== position.coords) {
						return {
							position: [
								position.coords.latitude,
								position.coords.longitude,
							],
							fetchingPosition: true
						};
					}
				});
			},
			(error) => console.log(error.message),
			{
				enableHighAccuracy: false,
				timeout: Infinity,
				maximumAge: 0
			}
		);
	};

	resetTraffic() {
		this.setState((prevState) => {
			if (prevState.filteredTraffic !== this.state.traffic) {
				return {
					filteredTraffic: this.state.traffic
				};
			}
		});
	}

	filterTrafficByColor(color) {
		if (color === '') {
			this.resetTraffic();
		} else {
			const filteredTraffic = this.state.traffic.filter((traffic) => traffic.color === color);
			this.setState((prevState) => {
				if (prevState.filteredTraffic !== filteredTraffic) {
					return {
						filteredTraffic
					};
				}
			});
		}
	}

	setRadius(radius) {
		this.setState(() => ({
			circleRadius: radius,
		}));
	}

	handleMapZoom(e) {
		const newZoom = e.target._zoom;
		this.setRadius(zoomRadius[newZoom]);
	}

	handleViewSidebar() {
		this.setState(prevState => ({
			bottomBarOpen: !prevState.bottomBarOpen,
		}));
	}

	// handles datepicker StartDate change
	onChangeStartDate(startDate) {
		if (this.state.endDate > startDate) {
			this.setState(() => ({
				endDate: startDate,
				startDate
			}));
		} else {
			this.setState({startDate});
		}
	}

	// handles datepicker EndDate change
	onChangeEndDate(endDate) {
		if (endDate < this.state.startDate) {
			this.setState(() => ({
				startDate: endDate,
				endDate
			}));
		} else {
			this.setState({endDate});
		}
	}

	onChangeStartHour(startHour) {
		this.setState({startHour});
	}

	onChangeEndHour(endHour) {
		this.setState({endHour});
	}

	togglePlaying() {
		this.setState(prevState => ({
			isPlaying: !prevState.isPlaying,
		}));
	}

	setDayFilter(dayIndex) {
		const date = this.state.startDate
			.clone()
			.set('weekDay', dayIndex);

		this.setState({
			startDate: date,
			endDate: date,
			playDate: this.state.playDate && date,
		});
	}

	// Our data is from 2014...
	static travelBackInTimeTo2014(date) {
		return date.clone()
			.set('year', 2014)
			.set('minute', 0)
			.set('second', 0)
			.set('millisecond', 0);
	}

	play() {
		const precision = 2;

		const dayLength = Math.ceil(this.state.endHour - this.state.startHour) + 1;
		const startDate = App.travelBackInTimeTo2014(this.state.startDate);
		const endDate = App.travelBackInTimeTo2014(this.state.endDate);

		const {playDate, playData, isPlaying} = this.state;

		if (!isPlaying) {
			return;
		}

		if (!playDate) {
			this.setState({playDate: startDate});

			getTrafficProgressForDuration(
				startDate,
				endDate,
				1,
			).then(playData => this.setState({
				playData: App.setColor(playData)
			}));

			return;
		}

		if (!playData) {
			return;
		}

		const playIndex = Math.max(0, playDate.get('hour') - this.state.startHour);
		const nextPlayIndex = Math.min((playIndex + precision) % dayLength, this.state.endHour);
		const hour = nextPlayIndex + this.state.startHour;
		let nextDate = playDate.clone().set('hour', hour);

		if (nextPlayIndex < playIndex) {
			nextDate = nextDate.add(1, 'day');
		}

		if (nextDate.isAfter(endDate)) {
			nextDate = startDate;
			nextDate.set('hour', hour);
		}

		const timestamp = playDate.toISOString();
		const filteredTraffic = playData.filter(
			data => data.timestamp === timestamp);

		this.setState({
			playDate: nextDate,
			filteredTraffic,
		});
	}

	render() {
		const datePicker = {
			startDate: this.state.startDate,
			endDate: this.state.endDate,
			onChangeStartDate: this.onChangeStartDate,
			onChangeEndDate: this.onChangeEndDate,
		};

		const timeFilter = {
			start: this.state.startHour,
			end: this.state.endHour,
			onChangeStart: this.onChangeStartHour,
			onChangeEnd: this.onChangeEndHour,
		};

		return (
			<div className="stauatlas-app">
				<BottomBar
					isOpen={this.state.bottomBarOpen}
					isPlaying={this.state.isPlaying}
					togglePlaying={this.togglePlaying}
					handleViewSidebar={this.handleViewSidebar}
					datePicker={datePicker}
					timeFilter={timeFilter}
					setDayFilter={this.setDayFilter}
				/>

				<CurrentPlayDate
					playDate={this.state.playDate}
				/>

				<MapView
					position={this.state.position ? this.state.position : this.state.dresdenPosition}
					circleRadius={this.state.circleRadius}
					handleZoomend={this.handleMapZoom}
					traffic={this.state.filteredTraffic}
					filterTrafficByColor={this.filterTrafficByColor}
				/>
			</div>
		);
	}
}
