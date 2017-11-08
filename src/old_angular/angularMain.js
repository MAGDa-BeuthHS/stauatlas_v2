/**
 * Created by Luise on 12.05.2017.
 */

angular.module('MainCtrl', ['ngAnimate']).controller('MainCtrl', ['$scope', '$http', '$rootScope', 'TrafficDataFactory', '$mdSidenav', '$timeout', '$interval', function ($scope, $http, $rootScope, TrafficDataFactory, $mdSidenav, $timeout, $interval) {

	let currentTrafficInfos = [];
	let mymap = null;
	let markers = new L.FeatureGroup();

	$scope.progressDatetime = 0;
	$rootScope.precisionSlider = 1;
	$rootScope.loader = false;



	$scope.trafficLimits = [];
	$scope.trafficLimits.green = {limit: " >=85%", color: 'rgb(0,255,0)', borderColor: '#2AE113'};
	$scope.trafficLimits.yellow = {limit: " 60%-85%", color: 'rgb(200,255,0)', borderColor: '#B6E800'};
	$scope.trafficLimits.orange = {limit: " 50%-60%", color: 'rgb(255,100,0)', borderColor: '#D65400'};
	$scope.trafficLimits.red = {limit: " <50%", color: 'rgb(255,0,0)', borderColor: '#C70000'};




	$timeout(function () {

		mymap = document.getElementById('map');

		TrafficDataFactory.getCurrentTrafficInfos().then(function (res) {
			currentTrafficInfos = res.data;
			if (currentTrafficInfos !== null) {
				renderMap(currentTrafficInfos);
				$scope.progressDatetime = moment().set('year', 2014).toDate();
			}
		}, function (error) {
			console.log(error);
		});

	});


	$scope.initMap = function (data) {

		mymap = new L.map('map', {zoomControl: false}).setView([51.044076127340635, 13.737666880671693], 13);
		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2FraW1hIiwiYSI6ImNqMXo5Z3F2bTAwZnUyeG41N210eWRtbGUifQ.vQjupMfaIwku2OMNsaPTDA', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18,
			id: 'your.mapbox.project.id',
			accessToken: 'pk.eyJ1Ijoic2FraW1hIiwiYSI6ImNqMXo5Z3F2bTAwZnUyeG41N210eWRtbGUifQ.vQjupMfaIwku2OMNsaPTDA'
		}).addTo(mymap);

		L.control.zoom({
			position: 'topright'
		}).addTo(mymap);

		mymap.addLayer(markers);

	};

	function renderMap(data) {
		markers.clearLayers();
		let col;
		let index = 0;


		let count = 0;
		for (let k in data) {
			if (data.hasOwnProperty(k)) {
				++count;
			}
		}

		if (data) {
			_.each(data, function (t) {

				let speedLimit = t.speed_limit;

				let avgSpeed = t.averageSpeed.toFixed(0); //inkl. Float formatieren)

				if (Math.round(t.relativeSpeed) >= 85) {
					col = $scope.trafficLimits.green.color;
					borderCol = $scope.trafficLimits.green.borderColor;
				}

				else if (Math.round(t.relativeSpeed) < 85 && Math.round(t.relativeSpeed) >= 60) {
					col = $scope.trafficLimits.yellow.color;
					borderCol = $scope.trafficLimits.yellow.borderColor;
				}
				else if (Math.round(t.relativeSpeed) < 60 && Math.round(t.relativeSpeed) >= 50) {
					col = $scope.trafficLimits.orange.color;
					borderCol = $scope.trafficLimits.orange.borderColor;
				}
				else if (Math.round(t.relativeSpeed) < 50) {
					col = $scope.trafficLimits.red.color;
					borderCol = $scope.trafficLimits.red.borderColor;
				}

				let myMarker = "";
				//passe das Design der Zusatzinfo der Richtgeschwindigkeit an
				let buttonBlue = "";
				let buttonBlue2 = "<a class='button-item blue' style='" + "margin-top:" + (Math.round(t.relativeSpeed)).toFixed(2) / -5 + "px;'>  <label> " + avgSpeed + "</label> </a>";
				let buttonBlue3 = "<a class='button-item blue-3' style='" + "margin-top:" + (Math.round(t.relativeSpeed)).toFixed(2) / -5 + "px;'>  <label> " + avgSpeed + "</label> </a>";
				if (avgSpeed >= 100)  buttonBlue = buttonBlue3;
				else buttonBlue = buttonBlue2;


				let buttonSpeedLimit = "";
				let buttonSpeedLimit2 = "<a class='button-item border-red fill-white' style='" + "margin-left:" + (Math.round(t.relativeSpeed)).toFixed(2) / -2 + "px;'><label>" + speedLimit + "</label></a>";
				let buttonSpeedLimit3 = "<a class='button-item border-red fill-white-2' style='" + "margin-left:" + (Math.round(t.relativeSpeed)).toFixed(2) / -2 + "px;'><label>" + speedLimit + "</label></a>";
				if (speedLimit >= 100)  buttonSpeedLimit = buttonSpeedLimit3;
				else buttonSpeedLimit = buttonSpeedLimit2;

				let top10Marker = "";
				let top10Marker1 = "<a class='button-item border-white top10'>  <label> " + "#" + (index + 1)+ "</label> </a>";
				let top10Marker2 = "<a class='button-item border-white top10-2'>  <label> " + "#" + (index + 1)+ "</label> </a>";
				if(index+1 == 10) top10Marker = top10Marker2;
				else top10Marker = top10Marker1;

				let size = 100-(Math.round(t.relativeSpeed)/2);
				if (size > 75) size = 75 ;

				if (count <= 10) {

					console.log('mit Ranking');

					myMarker = L.divIcon({

						html: "<nav class='menu'>" +
						"<input type='checkbox' class='button-open' name='button-open' id='button-open-" + index + "' href='#'/>" +
						"<label class='button-open-button' for='button-open-" + index + "' style='" +
						//"border-style: solid; border-width: 0.5px; border-color: " + borderCol + "; background: " + col + ";' >" +
							"border-style: solid; border-width: 0.5px; border-color: " + borderCol + "; background: " + col + "; width:"+  size +"px; height:"+ size +"px;'>" +

						"</label>" +

						"<a class='button-item border-white' style='" +
						"background-color: " + col + "'> <label> " + Math.round(t.relativeSpeed) + "% </label></a>" +
						buttonSpeedLimit +
						buttonBlue +
						top10Marker +

						"</nav>"
					});

				} else {

					myMarker = L.divIcon({

						html: "<nav class='menu'>" +
						"<input type='checkbox' class='button-open' name='button-open' id='button-open-" + index + "' href='#'/>" +
						"<label class='button-open-button' for='button-open-" + index + "' style='" +
						//"border-style: solid; border-width: 0.5px; border-color: " + borderCol + "; background: " + col + "; '>" +
						"border-style: solid; border-width: 0.5px; border-color: " + borderCol + "; background: " + col + "; width:"+ size +"px; height:"+ size +"px;'>" +

						"</label>" +

						"<a class='button-item border-white' style='" +
						"background-color: " + col + "'> <label> " + Math.round(t.relativeSpeed) + "% </label></a>" +
						buttonSpeedLimit +
						buttonBlue +

						"</nav>"

					});

				}

				let marker = L.marker([t.latitude, t.longitude], {icon: myMarker});

				markers.addLayer(marker);
				index++;
			});

		}
	}







	$scope.getCurrentTrafficInfos = function (top10, filter) {


		$scope.stop();
		console.log("Filtern?" + filter);

		TrafficDataFactory.getCurrentTrafficInfos(top10, filter).then(function (res) {
			currentTrafficInfos = res.data;
			if (currentTrafficInfos !== null) {
				renderMap(currentTrafficInfos);
				$scope.progressDatetime = moment().set('year', 2014).toDate();
			}
		}, function (error) {
			console.log(error);
		});

	};


	//////////////////////////////////////////////
	///////////// Range Funktionen ///////////////
	//////////////////////////////////////////////

	$scope.daysOfWeek = {};

	$scope.renderRange = function () {

		$scope.stop();
		$rootScope.loader = true;

		let rangeTimeValue = $('#rangeTime').val();
		let startTime = moment.unix(rangeTimeValue.split(';')[0]/1000);
		let range = rangeTimeValue.split(';')[1] - rangeTimeValue.split(';')[0];
		range /= 1000 * 60;

		let days = '';
		_.each($scope.daysOfWeek, function (val, day) {
			if (val) {
				if (days !== '') days += ',';
				days += day;
			}
		});

		if (days) {

			TrafficDataFactory.getRangeInfos(startTime.toISOString(), range, days).then(function (res) {
				currentTrafficInfos = res.data;
				if (currentTrafficInfos !== null) {
					renderMap(currentTrafficInfos);
					$scope.progressDatetime = '';
					$rootScope.loader = false;
					days = formatDays (days);

					$scope.progressDatetime = days + ': ' + startTime.clone().format('HH:mm') + 'h - ' + startTime.clone().add(range, 'minutes').format('HH:mm') + 'h';
				}
			}, function (error) {
				$rootScope.loader = false;
				console.log(error);
			});

		}
	};







	formatDays = function(days){
		let days_ = days.split(",");
		let formatDays = [];
		_.each(days_, function (val, day) {
			formatDays += " " + val.toString().charAt(0).toUpperCase() +  val.toString().substring(1);
		});
		console.log(formatDays);
		return formatDays;
	};

	$scope.getTrafficInfosTop10 = function () {

		$scope.stop();

		let top10 = true;

		TrafficDataFactory.getTrafficInfosTop10(top10).then(function (res) {
			currentTrafficInfos = res.data;
			if (currentTrafficInfos !== null) {
				renderMap(currentTrafficInfos);
			}
		}, function (error) {
			console.log(error);
		});

	};

	//////////////////////////////////////////////
	///////////// Verlauf Funktionen /////////////
	//////////////////////////////////////////////

	let promise;
	$scope.isPlaying = false;
	$scope.isPausing = false;
	$scope.playIndex = 0;
	$scope.playData = null;
	$scope.playDate = null;
	$scope.playPrecision = null;

	$scope.pause = function () {
		$interval.cancel(promise);
		$scope.isPlaying = false;
		$scope.isPausing = true;
	};

	$scope.stop = function () {
		$interval.cancel(promise);
		$scope.progressDatetime = 0;
		$scope.isPlaying = false;
		$scope.isPausing = false;
		markers.clearLayers();
	};

	$scope.resume = function () {
		promise = $interval(function () {
			$scope.progressDatetime = $scope.playDate.set('hour', $scope.playIndex).toDate();
			let tmp = $scope.playDate.clone().set('hour', $scope.playIndex).add(2, 'hours').toISOString();
			let input = _.filter($scope.playData, {timestamp: tmp});
			$scope.playIndex += $scope.playPrecision;
			if ($scope.playIndex > 23) $scope.playIndex = 0;
			renderMap(input);
		}, 1000);
		$scope.isPlaying = true;
		$scope.isPausing = false;
	};

	$scope.play = function (inputDate, precision) {

		$rootScope.loader = true;

		if (!$scope.isPausing) $scope.stop();
		$scope.isPausing = false;
		console.log(inputDate);
		console.log("precision:"+ precision);
		$scope.playDate = moment(inputDate).set('year', 2014).set('minute', 0).set('second', 0).set('millisecond', 0);
		console.log($scope.playDate);

		TrafficDataFactory.getDailyTrafficProgress($scope.playDate, precision).then(function (res) {
			currentTrafficInfos = res.data;
			if (currentTrafficInfos !== null) {
				$scope.playData = currentTrafficInfos;
				$scope.playPrecision = precision;
				$scope.playDate.set('hour', $scope.playIndex);
				$rootScope.loader = false;
				promise = $interval(function () {
					$scope.progressDatetime = $scope.playDate.set('hour', $scope.playIndex).toDate();
					let tmp = $scope.playDate.clone().set('hour', $scope.playIndex).add(2, 'hours').toISOString();
					let input = _.filter(currentTrafficInfos, {timestamp: tmp});
					$scope.playIndex += precision;
					if ($scope.playIndex > 23) $scope.playIndex = 0;
					else {

						renderMap(input);
					}
				}, 1000);
				$scope.isPlaying = true;
			}
		}, function (error) {
			console.log(error);
		});
	};

	$scope.renderRangeEvents = function(event){
		console.log(event);
		$rootScope.loader = true;
		$scope.stop();
		let precision = 1;
		let dateString = moment(event.startdate);
		$scope.playDate = dateString.clone();

		TrafficDataFactory.getDailyTrafficProgressDur(dateString.toISOString(), event.duration).then(function (res) {
			currentTrafficInfos = res.data;
			if (currentTrafficInfos !== null) {
				$scope.playData = currentTrafficInfos;
				$scope.playDate = moment(currentTrafficInfos[0].timestamp);
				let initialIndex = moment(currentTrafficInfos[0].timestamp);
				$scope.playIndex = initialIndex.clone();
				let enddate = moment(currentTrafficInfos[currentTrafficInfos.length-1].timestamp);
				$rootScope.loader = false;
				promise = $interval(function () {
					$scope.progressDatetime = $scope.playDate.clone().toDate();
					let input = _.filter(currentTrafficInfos, {timestamp: $scope.playDate.clone().toISOString()});
					$scope.playDate.add(precision, 'hours');
					if ($scope.playDate.diff(enddate, 'seconds') > 0) {
						renderMap(input);
						$scope.playDate = initialIndex.clone();
					}
					else {
						renderMap(input);
					}
				}, 1000);
			}
		}, function (error) {
			$scope.loader = false;
			console.log(error);
		});
	};




	$scope.getTrafficInfos = function (date, time, top10, filter) {

		console.log(top10);

		$scope.stop();

		let dateTime = moment(date).set('hour', time.getHours()).set('minute', time.getMinutes()).set('seconds', 0);
		$scope.progressDatetime = dateTime.clone().toDate();


		//requested Format: 2017-11-13T08:00Z
		let dateString = dateTime.clone().add(2, 'hours');

		console.log("Abfragezeit:" + dateString.toISOString());
		TrafficDataFactory.getTrafficInfos(dateString.toISOString(), top10, filter).then(function (res) {
			trafficInfos = res.data;
			if (trafficInfos !== null) {
				$scope.progressDatetime = dateString.subtract(2, 'hours').format('DD.MM.YYYY') + " - "+ dateString.format('HH:mm') ;
				renderMap(trafficInfos);
			}
		}, function (error) {
			console.log(error);
		});
	};

	$scope.getTrafficPerHour = function (date, hour) {

		$scope.stop();

		let dateString = moment(date).set('hour', hour).set('minute', 0);

		$scope.progressDatetime = dateString.toDate();

		TrafficDataFactory.getTrafficInfos(dateString.add(2, 'hours').toISOString()).then(function (res) {
			trafficInfos = res.data;
			if (trafficInfos !== null) {
				renderMap(trafficInfos);
			}
		}, function (error) {
			console.log(error);
		});
	};

	/*---------------------------Frontend-Functions-------------------------------*/
	$scope.toggleSidenav = buildToggler('left');
	function buildToggler(componentId) {
		return function () {
			$mdSidenav(componentId).toggle();
		};
	}
}]);

