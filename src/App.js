import React, {Component} from 'react';
import './App.css';

import {MapView} from './MapView/MapView';
import BottomBar from './BottomBar/BottomBar';
import {getDailyTrafficProgress, getTrafficInfos} from './trafficService';
import moment from 'moment';

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
		};

		this.filterTrafficByColor = this.filterTrafficByColor.bind(this);
		this.resetTraffic = this.resetTraffic.bind(this);
		this.handleViewSidebar = this.handleViewSidebar.bind(this);
		this.onChangeStartDate = this.onChangeStartDate.bind(this);
		this.onChangeEndDate = this.onChangeEndDate.bind(this);
		this.handleMapZoom = this.handleMapZoom.bind(this);
		this.togglePlaying = this.togglePlaying.bind(this);

		this.play = this.play.bind(this);
		setInterval(this.play, 1000);
	}

	componentWillMount() {
		if (typeof window !== 'object') {
			return;
		}
		if (!('geolocation' in window.navigator)) {
			return;
		}

		this.getCurrentPosition();
	}

	componentWillUnmount() {
		this.willUnmount = true;
	}

	componentDidMount() {
		getTrafficInfos()
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

	onChangeStartDate(startDate) {
		this.setState({startDate});
	}

	onChangeEndDate(endDate) {
		this.setState({endDate});
	}

	togglePlaying() {
		this.setState(prevState => ({
			isPlaying: !prevState.isPlaying,
		}));
	}

	play() {
		const precision = 2;
		const {playDate, playData, isPlaying} = this.state;

		if (!isPlaying) {
			return;
		}

		if (!playDate) {
			const date = moment()
				.set('year', 2014)
				.set('minute', 0)
				.set('second', 0)
				.set('millisecond', 0);

			this.setState({playDate: date});

			getDailyTrafficProgress(date, 1)
				.then(playData => this.setState({
					playData: App.setColor(playData)
				}));

			return;
		}

		let playIndex = playDate.get('hour');
		playIndex = (playIndex + precision) % 24;
		const nextDate = playDate.clone().set('hour', playIndex);

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

		return (
			<div className="stauatlas-app">
				<BottomBar
					isOpen={this.state.bottomBarOpen}
					isPlaying={this.state.isPlaying}
					togglePlaying={this.togglePlaying}
					handleViewSidebar={this.handleViewSidebar}
					datePicker={datePicker}
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
