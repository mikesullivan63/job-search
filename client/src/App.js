import React from "react";
import { Route, Switch } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Header from "./screens/common/Header";
import SearchPage from "./screens/search/SearchPage";
import LoginPage from "./screens/login/LoginPage";
import { RegisterPage } from "./screens/register";
import { authenticationService } from "./services/authentication";
import { searchService } from "./services/search";

class App extends React.Component {
  constructor(props) {
    super(props);

    authenticationService.setStore(this.props.store);
    searchService.setStore(this.props.store);
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
          <SearchPage store={this.props.store} />
        )}
      </React.Fragment>
    );
  }
}

export default inject("store")(observer(App));
