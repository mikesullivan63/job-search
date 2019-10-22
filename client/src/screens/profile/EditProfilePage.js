import React from "react";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import ProfileTextField from "../common/ProfileTextField";
import { profileService } from "../../services/profile";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { profileValidationService } from "../../services/profileValidation";

class EditProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profileLoading: false,
      profileUpdated: false,
      email: "",
      firstName: "",
      lastName: "",
      emailErrors: [],
      firstNameErrors: [],
      lastNameErrors: [],
      profileFormErrors: [],

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

    this.validateAndSubmit = this.validateAndSubmit.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  validateAndSubmitProfile(event) {
    event.preventDefault();

    this.setState({
      emailErrors: [],
      firstNameErrors: [],
      lastNameErrors: [],
      profileFormErrors: []
    });
    const { email, firstName, lastName } = this.state;

    //Process e-mail
    const erros = {};
    errors.emailErrors = profileValidationService.requiredValueCheck(
      email,
      "Email"
    );
    errors.firstNameErrors = profileValidationService.requiredValueCheck(
      firstName,
      "First Name"
    );
    errors.lastNameErrors = profileValidationService.requiredValueCheck(
      lastName,
      "Last Name"
    );

    this.setState(errors);

    const clean =
      errors.emailErrors.length === 0 &&
      errors.firstNameErrors.length === 0 &&
      errors.lastNameErrors.length === 0;

    if (clean) {
      this.setState({ profileLoading: true, profileUpdated: false });
      profileService
        .updateProfile(email, firstName, lastName)
        .then(user => {
          console.log("Profile Updated");

          this.setState({ profileLoading: false, profileUpdated: true });
        })
        .catch(error => {
          this.setState({
            profileLoading: false,
            profileUpdated: false,
            profileFormErrors: [].concat(error)
          });
        });
    }
  }

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
    if (this.state.registered) {
      return <Redirect to="/" />;
    }

    const { email, firstName, lastName, password, confirm } = this.state;

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Sign up for a new account
          </Header>
          <Form
            size="large"
            loading={this.state.loading}
            error={this.state.formErrors.length > 0}
            onSubmit={this.validateAndSubmit}
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
                name="email"
                icon="user"
                label="E-mail address"
                placeholder="E-mail address"
                errors={this.state.emailErrors}
                handleChange={this.handleChange}
              />
              <ProfileTextField
                form="register"
                name="firstName"
                label="First Name"
                placeholder="First Name"
                errors={this.state.firstNameErrors}
                handleChange={this.handleChange}
              />
              <ProfileTextField
                form="register"
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                errors={this.state.lastNameErrors}
                handleChange={this.handleChange}
              />
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
                onClick={event => this.validateAndSubmit(event)}
              />
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default observer(RegisterPage);
