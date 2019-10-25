import React from "react";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import AbstractForm from "../common/AbstractForm";
import { profileService } from "../../services/profile";
import { Grid } from "semantic-ui-react";

class RegisterPage extends AbstractForm {
  constructor(props) {
    super(props);

    //Form fields
    this.state.fields = [
      {
        name: "email",
        label: "E-mail address",
        icon: "user",
        required: true
      },
      {
        name: "firstName",
        label: "First Name",
        required: true
      },
      {
        name: "lastName",
        label: "Last Names",
        required: true
      },
      {
        name: "password",
        label: "Password",
        icon: "lock",
        type: "password",
        required: true
      },
      {
        name: "confirm",
        label: "Confirm Password",
        icon: "lock",
        type: "password",
        required: true
      }
    ];
  }

  submitForm = () => {
    return profileService.register(
      this.getValueForField("email"),
      this.getValueForField("firstName"),
      this.getValueForField("lastName"),
      this.getValueForField("password"),
      this.getValueForField("confirm")
    );
  };

  handleSuccess = result => {
    console.log("Saved registration");
  };

  render() {
    if (this.state.success) {
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
            "register",
            "Sign up for a new account",
            "Register Account",
            "New account registered",
            "Error attempting to register"
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default observer(RegisterPage);
