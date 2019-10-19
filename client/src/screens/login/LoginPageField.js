import React from "react";
import { Form, Input } from "semantic-ui-react";

class LoginPageField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form.Field
        fluid
        control={Input}
        iconPosition="left"
        inline="true"
        id={"login-form-input-control" + this.props.name}
        name={this.props.name}
        type={this.props.type}
        icon={this.props.icon}
        label={this.props.label}
        placeholder={this.props.placeholder}
        error={
          this.props.errors && this.props.errors.length > 0
            ? this.props.errors
            : null
        }
        onChange={this.props.handleChange}
      />
    );
  }
}
export default LoginPageField;
