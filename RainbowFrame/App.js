'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import RainbowFrame from './components/RainbowFrame';
import colors from "./colors.json"

ReactDOM.render(
  <RainbowFrame colors={colors}>
    Hello!
  </RainbowFrame>,
  document.getElementById('root')
);
