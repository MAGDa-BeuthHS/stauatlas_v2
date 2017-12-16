import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './day-filter.css';

const propTypes = {
	activeFilter: PropTypes.object.isRequired,
	setFilter: PropTypes.func.isRequired
};

function getWeekDays() {
	const filters = [];
	for (let i = 0; i <= 6; i++) {
		filters.push(moment().add(i, 'days'));
	}
	return filters;
}
const filter = getWeekDays();
const activeFilter = moment();

const FilterBar = ({ setFilter }) => (
	<div className="day-filter">
		{filter.map(f => {
			return (
				<span
					onClick={() => setFilter(f)}
					key={f}>
					<span
						className={`filter ${f.date() === activeFilter.date() && 'active'}`}
					>
						{moment(f).format('dd')}
					</span>
				</span>
			);
		})}
	</div>
);

FilterBar.propTypes = propTypes;
export default FilterBar;
