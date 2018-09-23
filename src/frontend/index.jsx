import 'babel-polyfill';
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import App from './components/App';

import RootStore from './stores/';
import getWeb3 from './utils/getWeb3';

const store = new RootStore();
window.store = store;

getWeb3
  .then((res) => {
    store.Web3Store.addWeb3(res.web3Instance);
    store.Web3Store.getAddress();
  })
  .catch(err => console.log(err));

render(
  <Provider {...store} >
    <Router>
      <Route component={App} />
    </Router>
  </Provider>,
  document.getElementById('mount-point'),
);

window.app = app;
