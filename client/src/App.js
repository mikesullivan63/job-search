import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Header from "./screens/common/Header";
import SearchPage from "./screens/search/SearchPage";
import LoginPage from "./screens/login/LoginPage";
import RegisterPage from "./screens/register/RegisterPage";
import EditProfilePage from "./screens/profile/EditProfilePage";
import WatchedJobsPage from "./screens/jobs/WatchedJobsPage";
import IgnoredJobsPage from "./screens/jobs/IgnoredJobsPage";
import { authenticationService } from "./services/authentication";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      remembered: false
    };
  }

  componentDidMount() {
    authenticationService.remember().then(profile => {
      this.setState({ remembered: true });
    });
  }

  render() {
    if (!this.state.remembered) {
      return null;
    }
    const location = this.props.location.pathname;
    if (!this.props.store.isLoggedIn()) {
      if (location !== "/login" && location !== "/register") {
        return <Redirect to="/login" />;
      }
    }

    if (this.props.store.isLoggedIn()) {
      if (
        location !== "/" &&
        location !== "/profile" &&
        location !== "/watched-jobs" &&
        location !== "/ignored-jobs"
      ) {
        return <Redirect to="/" />;
      }
    }

    return (
      <React.Fragment>
        <Header store={this.props.store} />
        <Switch>
          {!this.props.store.isLoggedIn() && (
            <React.Fragment>
              <Route
                exact
                path="/register"
                render={props => (
                  <RegisterPage {...props} store={this.props.store} />
                )}
              />
              <Route
                exact
                path="/login"
                render={props => (
                  <LoginPage {...props} store={this.props.store} />
                )}
              />
            </React.Fragment>
          )}
          {this.props.store.isLoggedIn() && (
            <React.Fragment>
              <Route
                exact
                path="/"
                render={props => (
                  <SearchPage {...props} store={this.props.store} />
                )}
              />
              <Route
                exact
                path="/profile"
                render={props => (
                  <EditProfilePage {...props} store={this.props.store} />
                )}
              />
              <Route
                exact
                path="/watched-jobs"
                render={props => (
                  <WatchedJobsPage {...props} store={this.props.store} />
                )}
              />
              <Route
                exact
                path="/ignored-jobs"
                render={props => (
                  <IgnoredJobsPage {...props} store={this.props.store} />
                )}
              />
            </React.Fragment>
          )}
        </Switch>
      </React.Fragment>
    );
  }
}

export default inject("store")(observer(withRouter(App)));
