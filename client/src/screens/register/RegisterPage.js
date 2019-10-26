import React from "react";
import { observer } from "mobx-react";
import ProfileForm from "../common/ProfileForm";
import { profileService } from "../../services/profile";
import { Grid } from "semantic-ui-react";

const RegisterPage = props => {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <ProfileForm
          name="register"
          title="Sign up for a new account"
          buttonLabel="Register Account"
          successMessage="New account registered"
          errorMessage="Error attempting to register"
          fields={profileService.PROFILE_FIELDS.concat(
            profileService.PASSWORD_FIELDS
          )}
          submitForm={data => {
            return profileService.register(data);
          }}
          handleSuccess={() => console.log("Saved registration")}
          redirectOnSuccess="/"
        />
      </Grid.Column>
    </Grid>
  );
};

export default observer(RegisterPage);
