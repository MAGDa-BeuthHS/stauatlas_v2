import moment from 'moment';
// get current Jam-Infos from the API

const API_BASE = 'http://localhost:4200/api/';

// get all sensor-points in Dresden.
export async function getAllTrafficSensors() {
	let url = `${API_BASE}all/`;

	// TODO: WTF? null or undefined?
	// I'm sure we can use a better url?
	url += 'null/undefined/undefined/';

	return fetch(url)
		.then(response => response.json())
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.error(error);
		});
}

export function getDailyTrafficProgress(date, precision) {
	date = moment(date).add(1, 'hours').toISOString();
	// eslint-disable-next-line no-console
	console.log(`Datum: ${date}`);

	return fetch(`${API_BASE}change/${date}/${precision}`)
		.then(response => response.json())
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.error(error);
		});
}

export function getRangeInfos(time, range, days) {
	// eslint-disable-next-line no-console
	console.log(`/api/range/${time}/${range}/${days}`);

	return fetch(`${API_BASE}range/${time}/${range}/${days}`);
}
export function getTrafficProgressForDuration(startDate, endDate, precision) {
	const date = moment(startDate).toISOString();
	const duration = moment.duration(endDate.diff(startDate)).asHours();

	return fetch(`${API_BASE}change/${date}/${duration}/${precision}`)
		.then(response => response.json())
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.error(error);
		});
}
