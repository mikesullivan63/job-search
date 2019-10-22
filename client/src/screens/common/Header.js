import React from "react";
import { useLocation, useHistory, withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Container, Image, Menu } from "semantic-ui-react";
import logo from "../../logo.svg";
import { loginService } from "../../services/login";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { location, history } = this.props;

    console.log(
      "Rendering header with location",
      JSON.stringify(location, null, 2),
      " and user ",
      JSON.stringify(this.props.store.getUser())
    );
    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
              Common Platform Job Search Tool
            </Menu.Item>
            {this.props.store.isLoggedIn() && (
              <React.Fragment>
                <Menu.Item>
                  Welcome, {this.props.store.getUser().firstName}
                </Menu.Item>
                <Menu.Item href="/" active={location.pathname === "/"}>
                  Search
                </Menu.Item>
                <Menu.Item
                  href="/watched-jobs"
                  active={location.pathname === "/watched-jobs"}
                >
                  Watched Jobs
                </Menu.Item>
                <Menu.Item
                  href="/ignored-jobs"
                  active={location.pathname === "/ignored-jobs"}
                >
                  Ignored Jobs
                </Menu.Item>
                <Menu.Item
                  href="/search-history"
                  active={location.pathname === "/search-history"}
                >
                  Search History
                </Menu.Item>
                <Menu.Item
                  href="/profile"
                  position="right"
                  active={location.pathname === "/profile"}
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  position="right"
                  onClick={() => {
                    loginService.logout();
                    history.push("/login");
                  }}
                >
                  Logout
                </Menu.Item>
              </React.Fragment>
            )}
            {!this.props.store.isLoggedIn() && (
              <React.Fragment>
                <Menu.Item
                  href="/login"
                  active={location.pathname === "/login"}
                >
                  Login
                </Menu.Item>
                <Menu.Item
                  href="/register"
                  active={location.pathname === "/register"}
                >
                  Register
                </Menu.Item>
              </React.Fragment>
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

export default withRouter(observer(Header));
