import React from "react";
import { Container, Image, Menu } from "semantic-ui-react";
import logo from "../../logo.svg";
import { loginService } from "../../services/login";

function Header(props) {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
            Common Platform Job Search Tool
          </Menu.Item>
          {props.store.isLoggedIn() && (
            <React.Fragment>
              <Menu.Item>Welcome, {props.store.getUser().firstName}</Menu.Item>
              <Menu.Item href="/" target="_blank">
                Search
              </Menu.Item>
              <Menu.Item href="/watched-jobs" target="_blank">
                Watched Jobs
              </Menu.Item>
              <Menu.Item href="/ignored-jobs" target="_blank">
                Ignored Jobs
              </Menu.Item>
              <Menu.Item href="/search-history" target="_blank">
                Search History
              </Menu.Item>
              <Menu.Item href="/profile" target="_blank" position="right">
                Profile
              </Menu.Item>
              <Menu.Item position="right" onClick={() => loginService.logout()}>
                Logout
              </Menu.Item>
            </React.Fragment>
          )}
          {!props.store.isLoggedIn() && (
            <React.Fragment>
              <Menu.Item href="/login" target="_blank">
                Login
              </Menu.Item>
              <Menu.Item href="/register" target="_blank">
                Register
              </Menu.Item>
            </React.Fragment>
          )}
        </Container>
      </Menu>
    </div>
  );
}

export default Header;
