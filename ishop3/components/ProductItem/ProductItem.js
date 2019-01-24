import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ProductItem.css';

export default class ProductItem extends Component {
  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired
    }),
    cbRemoveItem: PropTypes.func.isRequired,
    selectedId: PropTypes.string.isRequired,
    cbSelectItem: PropTypes.func.isRequired,
    cbEditSelectedItem: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
  };

  handlerSelectClick = (EO) => {
    if (!this.props.disabled && !(EO.target instanceof HTMLInputElement))
    {
      this.props.cbSelectItem(this.props.product.id);
    }
  };

  handlerRemoveButtonClick = () => {
    if (!this.props.disabled)
    {
      this.props.cbRemoveItem(this.props.product.id);
    }
  };

  handlerEditButtonClick = () => {
    if (!this.props.disabled)
    {
      this.props.cbEditSelectedItem(this.props.product.id);
    }
  };

  render() {
    const {
      selectedId,
      product: { id, image, name, description, price, total }
    } = this.props;

    return (
      <div
        className="Product_container"
        style={{ backgroundColor: selectedId === id ? '#FFFF00' : '#fff' }}
        onClick={this.handlerSelectClick}
      >
        <div className="Product_image">
          <img src={image} />
        </div>
        <div className="Product_description">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
        <div className="Product_price">
          <h2>{`Цена: ${price.toFixed(2)}`}</h2>
          <h3>{`Осталось: ${total}`}</h3>
          <input
            type="button"
            onClick={this.handlerRemoveButtonClick}
            value="Удалить"
          />
          <input
            type="button"
            onClick={this.handlerEditButtonClick}
            value="Редактировать"
          />
        </div>
      </div>
    );
  }
}
