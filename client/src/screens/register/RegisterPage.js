import React from "react";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import ProfileTextField from "../common/ProfileTextField";
import { registrationService } from "../../services/registration";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirm: "",
      emailErrors: [],
      firstNameErrors: [],
      lastNameErrors: [],
      passwordErrors: [],
      confirmErrors: [],
      formErrors: [],
      registered: false
    };

    this.validateAndSubmit = this.validateAndSubmit.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  validateAndSubmit(event) {
    event.preventDefault();

    this.setState({
      emailErrors: [],
      firstNameErrors: [],
      lastNameErrors: [],
      passwordErrors: [],
      confirmErrors: [],
      formErrors: []
    });
    const { email, firstName, lastName, password, confirm } = this.state;

    const fieldChecks = [
      [email, "Email", emailErrors],
      [firstName, "First Name", firstNameErrors],
      [lastName, "Last Name", lastNameErrors],
      [password, "Password", passwordErrors],
      [confirm, "Password Confirmation", confirmErrors]
    ];

    const errors = fieldChecks
      .filter(group => validationService.requiredValueCheck(group[0]))
      .forEach(group => {
        errors[group[2]] = group[1] + "is required";
      });

    const clean = fieldChecks.every(
      group => !errors[group[2]] || errors[group[2]].length == 0
    );

    if (clean) {
      this.setState({ loading: true });
      registrationService
        .register(email, firstName, lastName, password, confirm)
        .then(user => {
          console.log("Saved registration");

          this.setState({ registered: true });
        })
        .catch(error => {
          this.setState({
            loading: false,
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
