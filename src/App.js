import React, { Component } from 'react';
import './App.css';

import { MapView } from './MapView/MapView';
import BottomBar from './BottomBar/BottomBar';
import { getTrafficInfos } from './trafficService';

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
		traffic.map((t) => {
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
			circleRadius: 111,
			traffic: [],
			filteredTraffic: []
		};
		this.filterTrafficByColor = this.filterTrafficByColor.bind(this);
		this.resetTraffic = this.resetTraffic.bind(this);
		this.handleViewSidebar = this.handleViewSidebar.bind(this);
		this.handleOnDateClick = this.handleOnDateClick.bind(this);
		this.handleMapZoom = this.handleMapZoom.bind(this);
	}

	componentDidMount() {
		/*
     [{
     averageSpeed: 35,
     latitude:     51.118823986987536,
     longitude:    13.76635460086739,
     relativeSpeed:70,
     sensor_id:    1178,
     speed_limit:  50,
     }]
     */
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

	resetTraffic() {
		this.setState((prevState) => {
			if(prevState.filteredTraffic !== this.state.traffic) {
				return {
					filteredTraffic: this.state.traffic
				};
			}
		});
	}

	filterTrafficByColor(color) {
		if(color === '') {
			this.resetTraffic();
		} else {
			const filteredTraffic = this.state.traffic.filter((traffic) => traffic.color === color);
			this.setState((prevState) => {
				if(prevState.filteredTraffic !== filteredTraffic) {
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

	// dummy
	handleOnDateClick() {
		this.setState(prevState => ({
			bottomBarOpen: prevState.bottomBarOpen,
		}));
	}

	render() {
		return (
			<div className="stauatlas-app">
				<BottomBar
					isOpen={this.state.bottomBarOpen}
					handleViewSidebar={this.handleViewSidebar}
					handleOnDateClick={this.handleOnDateClick}
				/>

				<MapView
					position={[51.050407, 13.737262]}
					circleRadius={this.state.circleRadius}
					handleZoomend={this.handleMapZoom}
					traffic={this.state.filteredTraffic}
					filterTrafficByColor={this.filterTrafficByColor}
				/>
			</div>
		);
	}
}
