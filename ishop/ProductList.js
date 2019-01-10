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

  render: function() {
    let products = this.props.products.map(v =>
      React.DOM.div(
        { key: v.id, className: 'Product' },
        React.DOM.div(
          { className: 'Product_container' },
          React.DOM.div({ className: 'Product_image' },
            React.DOM.img({ src: v.image })
          ),
          React.DOM.div(
            { className: 'Product_description' },
              React.createElement('h1', null, v.name),
              React.createElement('p', null, v.description)
          ),
          React.DOM.div(
            { className: 'Product_price' },
            React.createElement('h2', null, `Цена: ${v.price.toFixed(2)}`),
            React.createElement('h3', null, `Осталось: ${v.total}`)
          )
        )
      )
    );
    return React.DOM.div({ className: 'Product_list' }, products);
  }
});
