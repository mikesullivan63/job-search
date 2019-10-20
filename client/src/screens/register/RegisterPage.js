import React from "react";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import RegisterPageField from "./RegisterPageField";
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
    let clean = true;

    this.setState({
      emailErrors: [],
      firstNameErrors: [],
      lastNameErrors: [],
      passwordErrors: [],
      confirmErrors: [],
      formErrors: []
    });
    const { email, firstName, lastName, password, confirm } = this.state;

    //Process e-mail
    if (!email || email === "") {
      clean = false;
      this.setState({
        emailErrors: ["Email is required"]
      });
    }

    //Process First Name
    if (!firstName || firstName === "") {
      clean = false;
      this.setState({
        firstNameErrors: ["First Name is required"]
      });
    }
    //Process Last Name
    if (!lastName || lastName === "") {
      clean = false;
      this.setState({
        lastNameErrors: ["Last Name is required"]
      });
    }

    //Process password
    if (!password || password === "") {
      clean = false;
      this.setState({
        passwordErrors: ["Password is required"]
      });
    }

    //Process password confirmation
    if (!confirm || confirm === "") {
      clean = false;
      this.setState({
        confirmErrors: ["Password Confirmation is required"]
      });
    }

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
              <RegisterPageField
                name="email"
                icon="user"
                label="E-mail address"
                placeholder="E-mail address"
                errors={this.state.emailErrors}
                handleChange={this.handleChange}
              />
              <RegisterPageField
                name="firstName"
                label="First Name"
                placeholder="First Name"
                errors={this.state.firstNameErrors}
                handleChange={this.handleChange}
              />
              <RegisterPageField
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                errors={this.state.lastNameErrors}
                handleChange={this.handleChange}
              />
              <RegisterPageField
                name="password"
                icon="lock"
                label="Password"
                placeholder="Password"
                type="password"
                errors={this.state.passwordErrors}
                handleChange={this.handleChange}
              />
              <RegisterPageField
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
