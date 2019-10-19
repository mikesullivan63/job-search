import React from "react";
import { Route, Switch } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Header from "./screens/common/Header";
import SearchBar from "./screens/search/SearchBar";
import { LoginPage } from "./screens/login";
import { RegisterPage } from "./screens/register";
import { authenticationService } from "./services/authentication";

class App extends React.Component {
  constructor(props) {
    super(props);

    authenticationService.setStore(this.props.store);
    authenticationService.remember();
  }
  render() {
    return (
      <React.Fragment>
        <Header store={this.props.store} />
        {!this.props.store.isLoggedIn() && (
          <Switch>
            <Route
              exact
              path="/register"
              render={props => (
                <RegisterPage
                  {...props}
                  store={this.props.store}
                  registrationCallback={this.processRegistration}
                />
              )}
            />
            <Route
              path="/"
              render={props => (
                <LoginPage {...props} store={this.props.store} />
              )}
            />
          </Switch>
        )}
        {this.props.store.isLoggedIn() && (
          <SearchBar store={this.props.store} />
        )}
      </React.Fragment>
    );
  }
}

export default inject("store")(observer(App));
