import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Frame from './Frame';
import "./RainbowFrame.css"

export default class RainbowFrame extends Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  render() {
    let innerText = <div className="RaibowFrame_text">{this.props.children}</div>

    let rainbows = this.props.colors.reduce((rainbow, color) => {
      return <Frame color={color}>{rainbow}</Frame>
    }, innerText);
    return <div className="RainbowFrame">{rainbows}</div>;
  }
}
