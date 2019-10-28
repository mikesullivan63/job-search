import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Container, Image, Menu } from "semantic-ui-react";
import logo from "../../logo.svg";
import { loginService } from "../../services/login";

const Header = props => {
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
              <Menu.Item href="/" active={props.location.pathname === "/"}>
                Search
              </Menu.Item>
              <Menu.Item
                href="/watched-jobs"
                active={props.location.pathname === "/watched-jobs"}
              >
                Watched Jobs
              </Menu.Item>
              <Menu.Item
                href="/ignored-jobs"
                active={props.location.pathname === "/ignored-jobs"}
              >
                Ignored Jobs
              </Menu.Item>
              <Menu.Item
                href="/search-history"
                active={props.location.pathname === "/search-history"}
              >
                Search History
              </Menu.Item>
              <Menu.Item
                href="/profile"
                position="right"
                active={props.location.pathname === "/profile"}
              >
                Profile
              </Menu.Item>
              <Menu.Item
                position="right"
                onClick={() => {
                  loginService.logout();
                  props.history.push("/login");
                }}
              >
                Logout
              </Menu.Item>
            </React.Fragment>
          )}
          {!props.store.isLoggedIn() && (
            <React.Fragment>
              <Menu.Item
                href="/login"
                active={props.location.pathname === "/login"}
              >
                Login
              </Menu.Item>
              <Menu.Item
                href="/register"
                active={props.location.pathname === "/register"}
              >
                Register
              </Menu.Item>
            </React.Fragment>
          )}
        </Container>
      </Menu>
    </div>
  );
};

export default withRouter(observer(Header));
