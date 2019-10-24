import React from "react";
import ProfileTextField from "../common/ProfileTextField";
import { Button, Form, Header, Message, Segment } from "semantic-ui-react";

class AbstractForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      fields: [],
      errors: [],
      complete: false
    };

    this.validateAndSubmit = this.validateAndSubmit.bind(this);
  }

  handleChange = (e, { name, value }) => {
    const newFields = this.state.fields.slice();
    newFields[newFields.findIndex(field => field.name === name)].value = value;
    this.setState({ fields: newFields });
  };

  getValueForField(fieldName) {
    return this.state.fields.find(field => field.name === fieldName).value;
  }

  submitForm = () => {
    console.log("To be implemented by children");
  };
  handleSuccess = result => {
    console.log("To be implemented by children");
  };

  validateAndSubmit(event) {
    event.preventDefault();

    //Clear out errors on submission start
    this.setState({ errors: [] });

    const errors = this.state.fields
      .filter(field => field.required)
      .filter(field => !field.value || field.value === "")
      .map(field => {
        return { field: field.name, message: field.label + " is required" };
      });

    if (errors.length > 0) {
      this.setState({ errors: errors });
    } else {
      this.setState({ loading: true });
      this.submitForm()
        .then(result => {
          this.handleSuccess(result);
          this.setState({ completed: true });
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

  renderHeaderAndForm(title, buttonLabel, successMessage, errorMessage) {
    return (
      <React.Fragment>
        <Header as="h2" color="teal" textAlign="center">
          {title}
        </Header>
        <Form
          size="large"
          loading={this.state.loading}
          success
          error={this.state.errors.some(el => el.field === "")}
          onSubmit={this.validateAndSubmit}
        >
          <Message
            error
            header={errorMessage}
            list={this.state.errors
              .filter(el => el.field === "")
              .map(el => el.message)}
          />
          {this.state.complete && <Message positive header={successMessage} />}
          <Segment>
            {this.state.fields.map(field => {
              return (
                <ProfileTextField
                  {...field}
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
              content={buttonLabel}
              label=""
              color="teal"
              fluid
              size="large"
              onClick={event => this.validateAndSubmit(event)}
            />
          </Segment>
        </Form>
      </React.Fragment>
    );
  }
}

export default AbstractForm;
