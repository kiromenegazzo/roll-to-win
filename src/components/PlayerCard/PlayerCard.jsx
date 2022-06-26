import PropTypes from 'prop-types';
import React from 'react';

import cn from 'classnames';

export const PlayerCard = ({ name, score, imageUrl, onClick, disabled, active }) => (
  <div className={cn('player', { 'player--active': active })}>
    <h2 className="player__title">{name}</h2>
    <img alt={name} src={imageUrl} />
    <span>
      Score:
      {' '}
      {score}
    </span>
    <button
      className="player__button"
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      Roll
    </button>
  </div>
);

PlayerCard.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  onClick: PropTypes.func,
};
