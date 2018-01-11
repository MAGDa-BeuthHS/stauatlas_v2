import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	isPlaying: PropTypes.bool.isRequired,
	togglePlaying: PropTypes.func.isRequired,
};

const PlayButton = ({togglePlaying, isPlaying}) =>
	<a className="play-selected" onClick={togglePlaying}>
		<span className={`fa fa-fw fa-lg fa-${isPlaying ? 'pause' : 'play'}`}/>
	</a>;

PlayButton.propTypes = propTypes;

export default PlayButton;