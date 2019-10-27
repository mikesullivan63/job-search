import React from "react";
import ProfileForm from "../common/ProfileForm";
import { authenticationService } from "../../services/authentication";
import { Grid, Message } from "semantic-ui-react";

const LoginPage = props => {
  const fields = [
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

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <ProfileForm
          name="login"
          title="Log-in to your account"
          buttonLabel="Login"
          successMessage="Logged in successfully"
          errorMessage="Error attempting to log in"
          fields={fields}
          submitForm={data => authenticationService.login(data)}
          handleSuccess={() => console.log("Logged user in")}
          redirectOnSuccess="/"
        />
        <Message>
          New to us? <a href="/register">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
