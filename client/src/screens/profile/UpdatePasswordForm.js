import React from "react";
import { Header, Form, Message, Segment, Button } from "semantic-ui-react";
import ProfileTextField from "../common/ProfileTextField";

import { profileValidationService } from "../../services/profileValidation";
import { profileService } from "../../services/profile";

class UpdatePasswordForm extends React.Component {
  constructor(props) {
    super(props);

    const user = this.props.store.getUser();
    this.state = {
      passwordLoading: false,
      passwordUpdated: false,
      oldPassword: "",
      password: "",
      confirm: "",
      oldPasswordErrors: [],
      passwordErrors: [],
      confirmErrors: [],
      passwordFormErrors: []
    };

    this.validateAndSubmitPassword = this.validateAndSubmitPassword.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  validateAndSubmitPassword(event) {
    event.preventDefault();

    this.setState({
      oldPasswordErrors: [],
      passwordErrors: [],
      confirmErrors: [],
      passwordFormErrors: []
    });
    const { oldPassword, password, confirm } = this.state;

    const errors = {};
    errors.oldPasswordErrors = profileValidationService.requiredValueCheck(
      oldPassword,
      "Current Password"
    );
    errors.passwordErrors = profileValidationService.requiredValueCheck(
      password,
      "New Password"
    );
    if (errors.passwordErrors.length === 0) {
      errors.passwordErrors = profileValidationService.isValidPassword(
        password
      );
    }

    errors.confirmErrors = profileValidationService.requiredValueCheck(
      confirm,
      "Confirm Password"
    );

    this.setState(errors);
    const clean =
      errors.oldPasswordErrors.length === 0 &&
      errors.passwordErrors.length === 0 &&
      errors.confirmErrors.length === 0;

    if (clean) {
      console.log("Submitting password update");
      this.setState({ passwordLoading: true, passwordUpdated: false });
      profileService
        .updatePassword(oldPassword, password, confirm)
        .then(user => {
          console.log("Password updated registration");

          this.setState({
            passwordLoading: false,
            passwordUpdated: true,
            oldPassword: "",
            password: "",
            confirm: "",
            oldPasswordErrors: [],
            passwordErrors: [],
            confirmErrors: [],
            passwordFormErrors: []
          });
        })
        .catch(error => {
          console.log("Submitting password update resulted in error", error);
          this.setState({
            passwordLoading: false,
            passwordUpdated: false,
            passwordFormErrors: [].concat(error)
          });
        });
    }
  }

  render() {
    console.log(
      "Rendering form from state",
      JSON.stringify(this.state, null, 2)
    );

    return (
      <React.Fragment>
        <Header as="h2" color="teal" textAlign="center">
          Change your password
        </Header>
        <Form
          size="large"
          loading={this.state.passwordLoading}
          error={this.state.passwordFormErrors.length > 0}
          success={this.state.passwordUpdated}
          onSubmit={this.validateAndSubmitPassword}
        >
          {this.state.passwordFormErrors.length > 0 && (
            <Message
              error
              header="Error updating password"
              list={this.state.formErrors}
            />
          )}
          {this.state.passwordUpdated && (
            <Message positive header="Password Updated" />
          )}
          <Segment>
            <ProfileTextField
              form="password"
              name="oldPassword"
              icon="lock"
              label="Current Password"
              placeholder="Current Password"
              type="password"
              errors={this.state.oldPasswordErrors}
              handleChange={this.handleChange}
            />
            <ProfileTextField
              form="password"
              name="password"
              icon="lock"
              label="New Password"
              placeholder="New Password"
              type="password"
              errors={this.state.passwordErrors}
              handleChange={this.handleChange}
            />
            <ProfileTextField
              form="password"
              name="confirm"
              icon="lock"
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              errors={this.state.confirmErrors}
              handleChange={this.handleChange}
            />
            <Form.Field
              id="password-form-button"
              control={Button}
              content="Update Password"
              label=""
              color="teal"
              fluid
              size="large"
              onClick={event => this.validateAndSubmitPassword(event)}
            />
          </Segment>
        </Form>
      </React.Fragment>
    );
  }
}
export default UpdatePasswordForm;
