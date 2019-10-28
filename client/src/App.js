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
import { searchService } from "./services/search";

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
      searchService.loadCompanies();
    });
  }

  render() {
    if (!this.state.remembered) {
      return null;
    }

    const loggedOutPaths = [
      {
        path: "/register",
        render: props => <RegisterPage {...props} store={this.props.store} />
      },
      {
        path: "/login",
        render: props => <LoginPage {...props} store={this.props.store} />
      }
    ];

    const loggedInPaths = [
      {
        path: "/",
        render: props => <SearchPage {...props} store={this.props.store} />
      },
      {
        path: "/profile",
        render: props => <EditProfilePage {...props} store={this.props.store} />
      },
      {
        path: "/watched-jobs",
        render: props => <WatchedJobsPage {...props} store={this.props.store} />
      },
      {
        path: "/ignored-jobs",
        render: props => <IgnoredJobsPage {...props} store={this.props.store} />
      }
    ];

    const location = this.props.location.pathname;
    if (!this.props.store.isLoggedIn()) {
      if (!loggedOutPaths.some(path => path.path === location)) {
        return <Redirect to="/login" />;
      }
    } else {
      if (!loggedInPaths.some(path => path.path === location)) {
        return <Redirect to="/" />;
      }
    }

    return (
      <React.Fragment>
        <Header store={this.props.store} />
        <Switch>
          {!this.props.store.isLoggedIn() &&
            loggedOutPaths.map(path => (
              <Route exact path={path.path} render={path.render} />
            ))}
          {this.props.store.isLoggedIn() &&
            loggedInPaths.map(path => (
              <Route exact path={path.path} render={path.render} />
            ))}
        </Switch>
      </React.Fragment>
    );
  }
}

export default inject("store")(observer(withRouter(App)));
