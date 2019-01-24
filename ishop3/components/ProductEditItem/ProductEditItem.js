import React from 'react';
import PropTypes from 'prop-types';

import './ProductEditItem.css';

function ProductEditItem(props) {
  const {
    label,
    type,
    name,
    value,
    cbChangeValue,
    errorMessage,
    hidden
  } = props;
  return (
    <div className="ProductEditItem">
      <label>{label}: </label>
      {cbChangeValue ? (
        <input type={type} name={name} value={value} onChange={cbChangeValue} />
      ) : (
        <label name={name}>{value}</label>
      )}
      <p hidden={hidden}>{errorMessage}</p>
    </div>
  );
}

ProductEditItem.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  cbChangeValue: PropTypes.func,
  errorMessage: PropTypes.string,
  hidden: PropTypes.bool
};

export default ProductEditItem;
