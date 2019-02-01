"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import data from './data.json';
import MobileCompany from './components/MobileCompany/MobileCompany';

ReactDOM.render(
  <MobileCompany clients={data} />,
  document.getElementById('root')
);
