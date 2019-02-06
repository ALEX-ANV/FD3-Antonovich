'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import data from './data.json';
import MobileCompany from './components/MobileCompany/MobileCompany';
import { collection } from './utils/ClientCollection';

collection.addClients(data);

ReactDOM.render(<MobileCompany />, document.getElementById('root'));
