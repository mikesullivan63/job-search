import React from 'react';
import Header from './screens/common/Header';
import SearchBar from './screens/search/SearchBar';
import { LoginPage } from './screens/login';
import { authenticationService } from './services/authentication';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.processLogin = this.processLogin.bind(this)
    this.logout = this.logout.bind(this)
    this.state = {
        currentUser: null
    };
  }

  processLogin() {
    console.log("before update!: "  + JSON.stringify(this.state));
    var user = authenticationService.getCurrentUser();
    console.log("user!: "  + JSON.stringify(user));
    this.setState({ currentUser: authenticationService.getCurrentUser() });
    console.log("updated!: "  + JSON.stringify(this.state));
    //this.forceUpdate();
  }

  componentDidMount() {
    this.setState({ currentUser: authenticationService.getCurrentUser() })
    console.log("on load!: "  + JSON.stringify(this.state));
  }

  logout() {
    authenticationService.logout();
    this.setState({ currentUser: null });
    //history.push('/login');
  }

  render() {
    const { currentUser } = this.state;
    console.log("rendering: : "  + JSON.stringify(currentUser));
    return (
    <React.Fragment>
      <Header logoutCallback={this.logout}/>
      {!currentUser && <LoginPage loginCallback={this.processLogin}/> }
      {currentUser && <SearchBar /> }
    </React.Fragment>
    );
  }
}

export default App;
