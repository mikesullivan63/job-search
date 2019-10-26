import React from "react";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import ProfileForm from "../common/ProfileForm";
import { authenticationService } from "../../services/authentication";
import { Grid, Message } from "semantic-ui-react";

class LoginPage extends ProfileForm {
  constructor(props) {
    super(props);

    this.state.fields = [
      {
        name: "email",
        label: "E-mail address",
        icon: "user"
      },
      {
        name: "password",
        label: "Password",
        icon: "lock",
        type: "password"
      }
    ];
  }

  submitForm = () => {
    return authenticationService.login(
      this.getValueForField("email"),
      this.getValueForField("password")
    );
  };

  handleSuccess = result => {
    console.log("Logged user in");
  };

  render() {
    if (this.props.store.isLoggedIn()) {
      return <Redirect to="/" />;
    }

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {this.renderHeaderAndForm(
            "login",
            "Log-in to your account",
            "Login",
            "Logged in successfully",
            "Error attempting to log in"
          )}
          <Message>
            New to us? <a href="/register">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default observer(LoginPage);
