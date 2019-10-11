import React from "react";
import { TopBar, TopBarLeft, TopBarRight } from "react-foundation";
import { Menu, MenuText, MenuItem } from "react-foundation";
import { authenticationService } from "../../services/authentication";

function Header(props) {
  return (
    <TopBar className="top-bar">
      <TopBarLeft className="my-top-bar-right">
        <Menu>
          <MenuText>Common Platform Job Search Tool</MenuText>
          <MenuItem>{props.firstName}</MenuItem>
        </Menu>
      </TopBarLeft>
      <TopBarRight className="my-top-bar-right">
        {authenticationService.getCurrentUser() && (
          <Menu>
            <MenuItem>
              Profile
            </MenuItem>
            <MenuItem>
              Search History
            </MenuItem>
            <MenuItem>
              Watched Jobs
            </MenuItem>
            <MenuItem>
              <button
                className="jobToggleButton"
                onClick={event => props.logoutCallback()}>
                Logout
              </button>
            </MenuItem>
          </Menu>
        )}
        {!authenticationService.getCurrentUser() && (
          <Menu>
            <MenuItem>
              <a href="/login">Login</a>
            </MenuItem>
            <MenuItem>
              <a href="/register">Register</a>
            </MenuItem>
          </Menu>
        )}
      </TopBarRight>
    </TopBar>
  );
}

export default Header;
