var ProductItem = React.createClass({
  displayName: 'ProductItem',

  propTypes: {
    product: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      price: React.PropTypes.number.isRequired,
      description: React.PropTypes.string.isRequired,
      image: React.PropTypes.string.isRequired,
      total: React.PropTypes.number.isRequired
    }),
    cbRemoveItem: React.PropTypes.func.isRequired,
    selectedId: React.PropTypes.string.isRequired,
    cbSelectItem: React.PropTypes.func.isRequired,
    deactive: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      background: {
        backgroundColor: '#fff'
      }
    };
  },

  handlerSelectClick: function() {
    this.props.cbSelectItem(this.props.product.id);
  },

  handlerRemoveButtonClick: function() {
    this.props.cbRemoveItem(this.props.product.id);
  },

  backgroundActive: { backgroundColor: '#FFFF00' },

  backgroundDeactive: { backgroundColor: '#fff' },

  render: function() {
    const { id, image, name, description, price, total } = this.props.product;

    const { deactive, selectedId } = this.props;

    return React.DOM.div(
      {
        className: 'Product_container',
        style: selectedId == id && !deactive ? this.backgroundActive : this.backgroundDeactive,
        onClick: this.handlerSelectClick
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
