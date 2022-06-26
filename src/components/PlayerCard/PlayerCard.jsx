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
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
