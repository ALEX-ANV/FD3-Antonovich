import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import './BR2JSX.css';

export default class BR2JSX extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  render() {
    let words = this.props.text.split(/<br *\/?>/);
    let innerText = words.map((t, i) => (
      <Fragment key={t}>
        {t}
        {i == words.length - 1 ? null : <br />}
      </Fragment>
    ));
    return <div className="text_container">{innerText}</div>;
  }
}
