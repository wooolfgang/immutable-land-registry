import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { HashRouter as Router } from 'react-router-dom';

@inject('UserStore', 'AuthStore') @observer
class App extends React.Component {
  componentDidMount() {
    const { AuthStore } = this.props;
    AuthStore.authenticate();
  }


  render() {
    const { AuthStore: { isAuthenticating, isAuthenticated } } = this.props;
    if (isAuthenticating) return null;

    return (
      <Router>
        <Fragment>
          <h1> Hello World </h1>
        </Fragment>
      </Router>
    );
  }
}

export default App;
