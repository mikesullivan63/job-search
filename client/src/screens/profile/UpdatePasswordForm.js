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

    errors.passwordErrors = errors.passwordErrors.concat(
      profileValidationService.isValidPassword
    );

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
      this.setState({ passwordLoading: true, passwordUpdated: false });
      profileService
        .updatePassword(oldPassword, password, confirm)
        .then(user => {
          console.log("Password updated registration");

          this.setState({ passwordLoading: false, passwordUpdated: true });
        })
        .catch(error => {
          this.setState({
            passwordLoading: false,
            passwordUpdated: false,
            formErrors: [].concat(error)
          });
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header as="h2" color="teal" textAlign="center">
          Change yoru password
        </Header>
        <Form
          size="large"
          loading={this.state.loading}
          error={this.state.formErrors.length > 0}
          onSubmit={this.validateAndSubmitPassword}
        >
          {this.state.formErrors.length > 0 && (
            <Message
              error
              header="Error attempting to register"
              list={this.state.formErrors}
            />
          )}
          <Segment>
            <ProfileTextField
              form="register"
              name="password"
              icon="lock"
              label="Password"
              placeholder="Password"
              type="password"
              errors={this.state.passwordErrors}
              handleChange={this.handleChange}
            />
            <ProfileTextField
              form="register"
              name="confirm"
              icon="lock"
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              errors={this.state.confirmErrors}
              handleChange={this.handleChange}
            />
            <Form.Field
              id="form-button-control-public"
              control={Button}
              content="Register Account"
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
