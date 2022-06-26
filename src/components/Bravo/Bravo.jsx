import PropTypes from 'prop-types';
import React from 'react';

export const Bravo = ({ children, onClick }) => (
  <div className="bravo">
    <h2>BRAVO!</h2>
    <p>Winner is</p>
    {children}
    <button
      className="bravo__button"
      type="button"
      onClick={onClick}
    >
      Try again
    </button>
  </div>
);

Bravo.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};
