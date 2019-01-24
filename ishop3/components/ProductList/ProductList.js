import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ProductItem from '../ProductItem/ProductItem';
import ProductEdit from '../ProductEdit/ProductEdit';
import ProductShow from '../ProductShow/ProductShow';

import './ProductList.css';

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
    viewMode: 0,
    selectedId: ''
  };

  handlerChangeBackground = id => {
    if (this.state.selectedId == id) {
      this.setState({ selectedProduct: undefined, selectedId: '' });
    } else {
      var selectedItem = this.state.products.find(t => t.id == id);
      this.setState({ selectedProduct: selectedItem, selectedId: id });
    }
  };

  handlerRemoveItem = id => {
    let state = { products: this.state.products.filter(t => t.id != id) };
    if (id == this.state.selectedId){
      state.selectedId = '';
      state.selectedProduct = undefined;
    }
    this.setState(state);
  };

  handlerAddItem = () => {
    this.setState({ viewMode: 1, selectedId: '', selectedProduct: undefined });
  };

  handlerEditItem = id => {
    var selectedItem = this.state.products.find(t => t.id == id);
    this.setState({
      viewMode: 2,
      selectedId: id,
      selectedProduct: selectedItem
    });
  };

  handlerCancelEditOrAddProduct = () => {
    this.setState({ viewMode: 0 });
  };

  handlerApplyEditOrAddProduct = (product, type) => {
    if (type == 1) {
      this.setState({
        products: [...this.state.products, product],
        viewMode: 0
      });
    } else {
      var newProducts = this.state.products.map(t => {
        return t.id == product.id ? product : t;
      });
      this.setState({ products: newProducts, viewMode: 0 });
    }
    if (product.id == this.state.selectedId) {
      this.setState({ selectedProduct: product });
    }
  };

  render() {
    let products = this.state.products.map(item => (
      <ProductItem
        disabled={this.state.viewMode != 0}
        product={item}
        cbRemoveItem={this.handlerRemoveItem}
        cbSelectItem={this.handlerChangeBackground}
        selectedId={this.state.selectedId}
        cbEditSelectedItem={this.handlerEditItem}
        key={item.id}
      />
    ));

    return (
      <Fragment>
        <div className="Products_panel">
          <input
            type="button"
            hidden={this.state.viewMode != 0}
            onClick={this.handlerAddItem}
            value="Добавить товар"
          />
        </div>
        {this.state.viewMode == 0 && this.state.selectedId != '' ? (
          <ProductShow product={this.state.selectedProduct} />
        ) : null}
        {this.state.viewMode > 0 ? (
          <ProductEdit
            type={this.state.viewMode}
            product={this.state.selectedProduct}
            cbApplyChanges={this.handlerApplyEditOrAddProduct}
            cbCancelChanges={this.handlerCancelEditOrAddProduct}
          />
        ) : null}
        <div className="Products_container">{products}</div>
      </Fragment>
    );
  }
}
