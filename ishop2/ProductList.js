var ProductList = React.createClass({
  displayName: 'ProductList',

  propTypes: {
    products: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        description: React.PropTypes.string.isRequired,
        image: React.PropTypes.string.isRequired,
        total: React.PropTypes.number.isRequired
      })
    )
  },

  getInitialState: function() {
    return {
      products: this.props.products,
      selectedId: '',
      deactive: false
    };
  },

  handlerChangeBackground(id) {
      this.setState({ selectedId: id, deactive: this.state.selectedId == id ? !this.state.deactive : this.state.deactive });
  },

  handlerRemoveItem: function(id) {
    this.setState({ products: this.state.products.filter(t => t.id != id) });
  },

  render: function() {
    let products = this.state.products.map(item =>
      React.createElement(ProductItem, {
        product: item,
        cbRemoveItem: this.handlerRemoveItem,
        cbSelectItem: this.handlerChangeBackground,
        selectedId: this.state.selectedId,
        deactive: this.state.deactive,
        key: item.id
      })
    );
    return React.DOM.div({ className: 'Products_container' }, products);
  }
});
