import React from 'react';
import PropTypes from 'prop-types';
import {Moment} from 'moment';
import './current-play-date.css';

export const CurrentPlayDate = ({playDate}) =>
	playDate ?
		<div className="box current-play-date">
			{playDate.format('DD.MM.YYYY hh:mm')}
		</div> :
		'';

CurrentPlayDate.propTypes = {
	playDate: PropTypes.instanceOf(Moment),
};