import moment from 'moment';
//get current Jam-Infos from the API

const API_BASE = 'http://141.64.5.234/excell-stauatlas/api/';

export async function getTrafficInfos(option, top10, filter) {
    let url = API_BASE + 'all/';

    // TODO: null or undefined? 
    // I'm sure we can use a better url?
    option ? url += option + '/' : url += 'null/';
    top10 ? url += top10 + '/' : url += 'undefined/';
    filter ? url += filter + '/' : url += 'undefined/';

    return fetch(url)
    .then((response) => response.json())
		.then((trafficData) => {
			return trafficData;
    })
    .catch((error) => {
      console.error(error);
    });
};

export function getDailyTrafficProgress(date, precision) {
  date = moment(date).add(1, "hours").toISOString();
  console.log("Datum: "+ date);
  return fetch(API_BASE + 'change/'+date+'/'+precision);
};

export function getRangeInfos(time, range, days) {
    console.log('/api/range/'+time+'/'+range+'/'+days);
    return fetch(API_BASE + 'range/'+time+'/'+range+'/'+days);
};
export function getDailyTrafficProgressDur(startdate, duration) {
    return fetch(API_BASE + 'change/'+startdate+'/'+duration+'/null');
};