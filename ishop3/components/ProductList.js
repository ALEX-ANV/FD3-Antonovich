import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';

import "./ProductList.css"

export default class ProductList extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired
      })
    )
  };

  state = {
    products: this.props.products,
    selectedId: ''
  };

  handlerChangeBackground = id => {
    this.setState({
      selectedId: id === this.state.selectedId ? "" : id,
    });
  };

  handlerRemoveItem = id => {
    this.setState({ products: this.state.products.filter(t => t.id != id) });
  };

  render() {
    let products = this.state.products.map(item => (
      <ProductItem
        product={item}
        cbRemoveItem={this.handlerRemoveItem}
        cbSelectItem={this.handlerChangeBackground}
        selectedId={this.state.selectedId}
        deactive={this.state.deactive}
        key={item.id}
      />
    ));
    return <div className="Products_container">{products}</div>
  }
}
