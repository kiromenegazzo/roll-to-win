import PropTypes from 'prop-types';
import React from 'react';

export const Error = ({ onClick }) => (
  <div className="error">
    <h2>Something went wrong</h2>
    <button type="button" onClick={onClick}>Try to update</button>
  </div>
);

Error.propTypes = {
  onClick: PropTypes.func,
};
