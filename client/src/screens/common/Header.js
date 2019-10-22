import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Image, Menu } from "semantic-ui-react";
import logo from "../../logo.svg";
import { loginService } from "../../services/login";

function Header(props) {
  const location = useLocation();
  console.log(
    "Rendering header with location",
    JSON.stringify(location, null, 2)
  );
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
              <Menu.Item href="/">Search</Menu.Item>
              <Menu.Item href="/watched-jobs">Watched Jobs</Menu.Item>
              <Menu.Item href="/ignored-jobs">Ignored Jobs</Menu.Item>
              <Menu.Item href="/search-history">Search History</Menu.Item>
              <Menu.Item
                href="/profile"
                position="right"
                active={location.pathname === "/profile"}
              >
                Profile
              </Menu.Item>
              <Menu.Item position="right" onClick={() => loginService.logout()}>
                Logout
              </Menu.Item>
            </React.Fragment>
          )}
          {!props.store.isLoggedIn() && (
            <React.Fragment>
              <Menu.Item href="/login">Login</Menu.Item>
              <Menu.Item href="/register">Register</Menu.Item>
            </React.Fragment>
          )}
        </Container>
      </Menu>
    </div>
  );
}

export default Header;
