import React from "react";
import { observer } from "mobx-react";
import { Grid } from "semantic-ui-react";
import UpdateProfileForm from "./UpdateProfileForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

const EditProfilePage = props => {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <UpdateProfileForm store={props.store} />
        <UpdatePasswordForm store={props.store} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(EditProfilePage);
