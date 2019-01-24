import React from 'react';
import PropTypes from 'prop-types';

const Frame = props => {
  return (
    <div
      style={{ border: `8px solid ${props.color}`, margin: '5px' }}
      className="Frame"
    >
      {props.children}
    </div>
  );
};

Frame.propTypes = {
  color: PropTypes.string.isRequired
};

export default Frame;
