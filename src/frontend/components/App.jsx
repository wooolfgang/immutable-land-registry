import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Admin from '../pages/Admin';

@inject('AuthStore', 'LandStore') @observer
class App extends React.Component {
  componentDidMount() {
    const { AuthStore } = this.props;
    AuthStore.authenticate();
  }


  render() {
    const { AuthStore: { isAuthenticating, isAuthenticated }, LandStore: { landContract } } = this.props;
    if (isAuthenticating) return null;

    return (
      <Router>
        <Fragment>
          { !(window.location.hash === '#/login' || window.location.hash === '#/admin') &&
            <Route path="/" component={isAuthenticated ? Main : Landing} />
          }
          <Route exact path="/login" component={Login} />
          {
            landContract &&
            <Route exact path="/admin" component={isAuthenticated ? Admin : () => <h1> Not authenticated</h1>} />
          }
        </Fragment>
      </Router>
    );
  }
}

export default App;
