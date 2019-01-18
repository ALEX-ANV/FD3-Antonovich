"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import data from './data.json';
import ProductList from './components/ProductList';

ReactDOM.render(
  <ProductList products={data} />,
  document.getElementById('root')
);
