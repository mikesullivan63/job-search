import React from "react";
import { observer } from "mobx-react";
import { Grid } from "semantic-ui-react";
import UpdateProfileForm from "./UpdateProfileForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

class EditProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <UpdateProfileForm store={this.props.store} />
          <UpdatePasswordForm store={this.props.store} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default observer(EditProfilePage);
