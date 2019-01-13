var ProductItem = React.createClass({
  displayName: 'ProductItem',

  propTypes: {
    product: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      price: React.PropTypes.number.isRequired,
      description: React.PropTypes.string.isRequired,
      image: React.PropTypes.string.isRequired,
      total: React.PropTypes.number.isRequired,
      cbRemoveItem: React.PropTypes.func.isRequired,
      selectedProductId: React.PropTypes.string
    })
  },

  getInitialState: function() {
    return {
      background: {
        backgroundColor: '#fff'
      }
    };
  },

  handlerChangeBackground() {
    if (this.state.background.backgroundColor == '#fff') {
      this.setState({ background: { backgroundColor: '#FFFF00' } });
    } else {
      this.setState({ background: { backgroundColor: '#fff' } });
    }
  },

  handlerRemoveButtonClick: function() {
    this.props.product.cbRemoveItem(this.props.product.id);
  },

  render: function() {
    const { image, name, description, price, total, id } = this.props.product;
    return React.DOM.div(
      {
        className: 'Product_container',
        style: this.state.background,
        onClick: this.handlerChangeBackground
      },
      React.DOM.div(
        { className: 'Product_image' },
        React.DOM.img({ src: image })
      ),
      React.DOM.div(
        { className: 'Product_description' },
        React.createElement('h1', null, name),
        React.createElement('p', null, description)
      ),
      React.DOM.div(
        { className: 'Product_price' },
        React.createElement('h2', null, `Цена: ${price.toFixed(2)}`),
        React.createElement('h3', null, `Осталось: ${total}`),
        React.DOM.input({
          type: 'button',
          onClick: this.handlerRemoveButtonClick,
          value: 'Удалить'
        })
      )
    );
  }
});
