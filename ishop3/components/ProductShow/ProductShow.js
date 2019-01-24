import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProductShow = props => {
  if (!props.product) {
    return null;
  }
  const { id, name, total, price } = props.product;
  return (
    <div className="ProductShow_container">
      <div>ID: {id} </div>
      <div>Name: {name} </div>
      <div>Total: {total} </div>
      <div>Price: {price} </div>
    </div>
  );
};

ProductShow.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired
  })
};

export default ProductShow;
