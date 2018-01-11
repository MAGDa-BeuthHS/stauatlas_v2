import moment from 'moment';

export const holidays = [
	moment('23.12.2017', 'DD.MM.YYYY'),
	moment('24.12.2017', 'DD.MM.YYYY'),
	moment('25.12.2017', 'DD.MM.YYYY'),
	moment('26.12.2017', 'DD.MM.YYYY'),
	moment('27.12.2017', 'DD.MM.YYYY'),
	moment('28.12.2017', 'DD.MM.YYYY'),
	moment('29.12.2017', 'DD.MM.YYYY'),
	moment('30.12.2017', 'DD.MM.YYYY'),
	moment('31.12.2017', 'DD.MM.YYYY'),
	moment('01.01.2018', 'DD.MM.YYYY'),
	moment('02.01.2018', 'DD.MM.YYYY'),
];

export const events = [
	moment().add(1, 'days'),
	moment().add(2, 'days'),
	moment().add(3, 'days'),
	moment().add(4, 'days'),
];