var FilterBox = React.createClass({
  displayName: 'FilterBox',

  propTypes: {
    words: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  getInitialState: function() {
    return {
      order: false,
      filter: '',
      wordsArray: this.props.words,
      words: this.props.words.join('\r\n')
    };
  },

  handlerChangeText: function(EO) {
    this.setState({ filter: EO.target.value }, this.orderWords);
  },

  handlerChangeOrder: function() {
    this.setState({ order: !this.state.order }, this.orderWords);
  },

  orderWords() {
    let filtered = this.state.wordsArray.filter(item =>
      item.includes(this.state.filter)
    );
    if (this.state.order) {
      filtered.sort();
    }
    this.setState({
      words: filtered.join("\n")
    });
  },

  handlerChangeAreaText: function(EO) {
    this.setState(
      { wordsArray: EO.target.value.split("\n"), words: EO.target.value },
      this.orderWords
    );
  },

  render: function() {
    return React.DOM.div(
      { className: 'filter_container' },
      React.DOM.div(
        { className: 'filter_panel' },
        React.DOM.input({
          type: 'checkbox',
          onClick: this.handlerChangeOrder,
          value: this.state.order
        }),
        React.DOM.input({
          type: 'text',
          onChange: this.handlerChangeText,
          value: this.state.filter
        })
      ),
      React.DOM.textarea({
        className: 'filter_box',
        value: this.state.words,
        onChange: this.handlerChangeAreaText
      })
    );
  }
});
