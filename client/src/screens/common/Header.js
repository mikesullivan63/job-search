import React from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  //Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import logo from "../../logo.svg";
import { authenticationService } from "../../services/authentication";

function Header(props) {
  let profile = null;
  authenticationService.getCurrentUserProfile().then(result => {
    profile = result;
  });

  console.log("In Header:", JSON.stringify(profile));
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
            Common Platform Job Search Tool
          </Menu.Item>
          {authenticationService.getCurrentUser() && (
            <React.Fragment>
              <Menu.Item>Welcome, {profile.first_name}</Menu.Item>
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
            </React.Fragment>
          )}
          {!authenticationService.getCurrentUser() && (
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
