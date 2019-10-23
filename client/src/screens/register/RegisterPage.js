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
      errors: [],
      registered: false
    };

    this.formFields = [
      {
        name: "email",
        label: "E-mail address",
        icon: "user",
        required: true
      },
      {
        name: "firstName",
        label: "First Name",
        required: true
      },
      {
        name: "lastName",
        label: "Last Names",
        required: true
      },
      {
        name: "password",
        label: "Password",
        icon: "lock",
        type: "password",
        required: true
      },
      {
        name: "confirm",
        label: "Confirm Password",
        icon: "lock",
        type: "password",
        required: true
      }
    ];

    this.validateAndSubmit = this.validateAndSubmit.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  validateAndSubmit(event) {
    event.preventDefault();

    this.setState({
      errors: []
    });
    const { email, firstName, lastName, password, confirm } = this.state;
    const errors = this.formFields
      .filter(field => this.state[field.name] === "")
      .map(field => {
        return { field: field.name, message: field.label + " is required" };
      });

    if (errors.length > 0) {
      this.setState({ errors: errors });
    } else {
      this.setState({ loading: true });
      registrationService
        .register(email, firstName, lastName, password, confirm)
        .then(user => {
          console.log("Saved registration");

          this.setState({ registered: true });
        })
        .catch(error => {
          if (Array.isArray(error)) {
            this.setState({
              loading: false,
              errors: error.map(el => {
                return { field: "", message: el };
              })
            });
          } else {
            this.setState({
              loading: false,
              errors: [{ field: "", message: error }]
            });
          }
        });
    }
  }

  render() {
    if (this.state.registered) {
      return <Redirect to="/" />;
    }

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
            error={this.state.errors.filter(el => el.field === "") > 0}
            onSubmit={this.validateAndSubmit}
          >
            <Message
              error
              header="Error attempting to register"
              list={this.state.errors
                .filter(el => el.field === "")
                .map(el => el.message)}
            />
            <Segment>
              {this.formFields.map(field => {
                const props = {};
                props.form = "register";
                props.name = field.name;
                if (field.icon) {
                  props.icon = field.icon;
                }
                props.label = field.label;
                props.placeholder = field.label;

                if (field.type) {
                  props.type = field.type;
                }
                return (
                  <ProfileTextField
                    {...props}
                    errors={this.state.errors
                      .filter(el => el.field === field.name)
                      .map(el => el.message)}
                    handleChange={this.handleChange}
                  />
                );
              })}
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
