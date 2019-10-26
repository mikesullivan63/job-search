import React from "react";
import { Redirect } from "react-router-dom";
import ProfileTextField from "./ProfileTextField";
import { Button, Form, Header, Message, Segment } from "semantic-ui-react";

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      fields: this.props.fields,
      errors: [],
      success: false
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
      this.setState({ errors });
    } else {
      this.setState({ loading: true });

      const data = this.state.fields.reduce((result, field) => {
        result[field.name] = field.value;
        console.log(
          "After processing",
          JSON.stringify(field, null, 2),
          "result",
          JSON.stringify(result, null, 2)
        );
        return result;
      }, {});

      this.props
        .submitForm(data)
        .then(result => {
          this.props.handleSuccess(result);
          this.setState({ loading: false, success: true });
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
    console.log(
      "this.state.success",
      this.state.success,
      "this.props.redirectOnSuccess",
      this.props.redirectOnSuccess,
      this.props.redirectOnSuccess !== ""
    );
    if (this.state.success && this.props.redirectOnSuccess !== "") {
      return <Redirect to={this.props.redirectOnSuccess} />;
    }

    return (
      <React.Fragment>
        <Header as="h2" color="teal" textAlign="center">
          {this.props.title}
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
            header={this.props.errorMessage}
            list={this.state.errors
              .filter(el => el.field === "")
              .map(el => el.message)}
          />
          {this.state.success && (
            <Message positive header={this.props.successMessage} />
          )}
          <Segment>
            {this.state.fields.map(field => {
              return (
                <ProfileTextField
                  form={this.props.form}
                  {...field}
                  errors={this.state.errors
                    .filter(el => el.field === field.name)
                    .map(el => el.message)}
                  handleChange={this.handleChange}
                />
              );
            })}
            <Form.Field
              id={this.props.form + "form-button-control-public"}
              control={Button}
              content={this.props.buttonLabel}
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

export default ProfileForm;
