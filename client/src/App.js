import React from "react";
import { Route, Switch /*, useHistory */ } from 'react-router-dom'
import Header from "./screens/common/Header";
import SearchBar from "./screens/search/SearchBar";
import { LoginPage } from "./screens/login";
import { RegisterPage } from "./screens/register";
import { createBrowserHistory } from 'history';
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
    this.setState({ currentUser: authenticationService.getCurrentUser() });
  }

  processRegistration() {
    const history = createBrowserHistory();

    console.log("In register callback")
    history.push("/");
    console.log("Pushed history")
    this.setState({ currentUser: authenticationService.getCurrentUser() });
    console.log("State set")
  }

  logout() {
    authenticationService.logout();
    this.setState({ currentUser: null });
  }

  componentDidMount() {
    this.setState({ currentUser: authenticationService.getCurrentUser() });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <React.Fragment>
        <Header logoutCallback={this.logout} />
        {!currentUser && 
          <Switch>
            <Route 
              exact path="/register" 
              render={(props) => <RegisterPage {...props} registrationCallback={this.processRegistration} />} 
              />
            <Route 
              path="/" 
              render={(props) => <LoginPage {...props} loginCallback={this.processLogin} />} 
              />
          </Switch>
        }
        {currentUser && <SearchBar />}
      </React.Fragment>
    );
  }
}

export default App;
