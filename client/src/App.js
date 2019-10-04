import React from 'react';
import Header from './screens/common/Header';
import SearchBar from './screens/search/SearchBar';
import { LoginPage } from './screens/login';
import { authenticationService } from './services/authentication';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        currentUser: null
    };
  }

  componentDidMount() {
    this.setState({ currentUser: authenticationService.getCurrentUser() })
  }

  logout() {
    authenticationService.logout();
    //history.push('/login');
  }

  render() {
    const { currentUser } = this.state;
    return (
    <React.Fragment>
      <Header />
      {!currentUser && <LoginPage /> }
      {currentUser && <SearchBar /> }
    </React.Fragment>
    );
  }
}

export default App;
