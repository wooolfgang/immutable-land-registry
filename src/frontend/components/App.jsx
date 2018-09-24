import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Landing from '../pages/Landing';
import Login from '../pages/Login';

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
          { !(window.location.hash === '#/login') &&
            <Route path="/" component={isAuthenticated ? Main : Landing} />
          }
          <Route exact path="/login" component={Login} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
