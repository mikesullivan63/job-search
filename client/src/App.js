import React from "react";
import { Route, Switch } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Header from "./screens/common/Header";
import SearchBar from "./screens/search/SearchBar";
import { LoginPage } from "./screens/login";
import { RegisterPage } from "./screens/register";
import { createBrowserHistory } from "history";
import { authenticationService } from "./services/authentication";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.processLogin = this.processLogin.bind(this);
    this.processRegistration = this.processRegistration.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      currentUser: null
    };
  }

  processLogin() {
    this.props.store.setUser();

    this.setState({ currentUser: authenticationService.getCurrentUser() });
  }

  processRegistration() {
    const history = createBrowserHistory();
    history.push("/");
    this.setState({ currentUser: authenticationService.getCurrentUser() });
  }

  logout() {
    authenticationService.logout();
    this.setState({ currentUser: null });
  }

  componentDidMount() {
    this.setState({ currentUser: authenticationService.getCurrentUser() });
  }

  render() {
    const { store } = this.props;
    const { currentUser } = this.state;
    return (
      <React.Fragment>
        <Header logoutCallback={this.logout} />
        {!currentUser && (
          <Switch>
            <Route
              exact
              path="/register"
              render={props => (
                <RegisterPage
                  {...props}
                  registrationCallback={this.processRegistration}
                />
              )}
            />
            <Route
              path="/"
              render={props => (
                <LoginPage {...props} loginCallback={this.processLogin} />
              )}
            />
          </Switch>
        )}
        {currentUser && <SearchBar store={store} />}
      </React.Fragment>
    );
  }
}

export default inject("store")(observer(App));
