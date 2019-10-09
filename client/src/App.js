import React from "react";
import Header from "./screens/common/Header";
import SearchBar from "./screens/search/SearchBar";
import { LoginPage } from "./screens/login";
import { authenticationService } from "./services/authentication";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.processLogin = this.processLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      currentUser: null
    };
  }

  processLogin() {
    var user = authenticationService.getCurrentUser();
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
    const { currentUser } = this.state;
    return (
      <React.Fragment>
        <Header logoutCallback={this.logout} />
        {!currentUser && <LoginPage loginCallback={this.processLogin} />}
        {currentUser && <SearchBar />}
      </React.Fragment>
    );
  }
}

export default App;
