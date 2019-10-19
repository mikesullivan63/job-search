import React from "react";
import { observer } from "mobx-react";
import { authenticationService } from "../../services/authentication";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Input
} from "semantic-ui-react";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: "",
      password: "",
      emailErrors: [],
      passwordErrors: [],
      formErrors: []
    };

    this.validateAndSubmit = this.validateAndSubmit.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  validateAndSubmit(event) {
    event.preventDefault();
    let clean = true;

    this.setState({
      emailErrors: [],
      passwordErrors: [],
      formErrors: []
    });
    const { email, password } = this.state;

    //Process e-mail
    if (!email || email === "") {
      clean = false;
      this.setState({
        emailErrors: ["Email is required to log in"]
      });
    }

    //Process password
    if (!password || password === "") {
      clean = false;
      this.setState({
        passwordErrors: ["Password is required to log in"]
      });
    }

    if (clean) {
      this.setState({ loading: true });
      authenticationService
        .login(email, password)
        .then(user => console.log("Logged user in"))
        .catch(error => {
          this.setState({
            loading: false,
            formErrors: [].concat(error)
          });
        });
    }
  }

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
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
                header="Error attempting to log in"
                list={this.state.formErrors}
              />
            )}
            <Segment stacked>
              <Form.Field
                id="form-input-control-email"
                control={Input}
                fluid
                icon="user"
                iconPosition="left"
                inline="true"
                name="email"
                label="E-mail address"
                placeholder="E-mail address"
                onChange={this.handleChange}
                error={
                  this.state.emailErrors.length > 0
                    ? this.state.emailErrors
                    : null
                }
              />
              <Form.Field
                id="form-input-control-password"
                control={Input}
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                inline="true"
                label="Password"
                placeholder="Password"
                type="password"
                onChange={this.handleChange}
                error={
                  this.state.passwordErrors.length > 0
                    ? this.state.passwordErrors
                    : null
                }
              />
              <Form.Field
                id="form-button-control-public"
                control={Button}
                content="Login"
                label=""
                color="teal"
                fluid
                size="large"
                onClick={event => this.validateAndSubmit(event)}
              />
            </Segment>
          </Form>
          <Message>
            New to us? <a href="/register">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default observer(LoginPage);
