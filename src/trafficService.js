import moment from 'moment';
// get current Jam-Infos from the API

const API_BASE = 'http://localhost:4200/api/';

export async function getTrafficInfos(option, top10, filter) {
	let url = `${API_BASE}all/`;

	// TODO: null or undefined?
	// I'm sure we can use a better url?
	url += option ? `${option}/` : 'null/';
	url += top10 ? `${top10}/` : 'undefined/';
	url += filter ? `${filter}/` : 'undefined/';

	return fetch(url)
		.then(response => response.json())
		.then(trafficData => trafficData)
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.error(error);
		});
}

export function getDailyTrafficProgress(date, precision) {
	date = moment(date).add(1, 'hours').toISOString();
	// eslint-disable-next-line no-console
	console.log(`Datum: ${date}`);
	return fetch(`${API_BASE}change/${date}/${precision}`);
}

export function getRangeInfos(time, range, days) {
	// eslint-disable-next-line no-console
	console.log(`/api/range/${time}/${range}/${days}`);
	return fetch(`${API_BASE}range/${time}/${range}/${days}`);
}
export function getDailyTrafficProgressDur(startdate, duration) {
	return fetch(`${API_BASE}change/${startdate}/${duration}/null`);
}
