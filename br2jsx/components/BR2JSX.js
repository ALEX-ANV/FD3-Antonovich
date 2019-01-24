import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import './BR2JSX.css';

export default class BR2JSX extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  render() {
    var innerText = this.props.text.split(/<br *\/?>/).map(t => (<Fragment>{t}<br /></Fragment>));
    return (
      <div className="text_container">
       {innerText}
      </div>
    );
  }
}
