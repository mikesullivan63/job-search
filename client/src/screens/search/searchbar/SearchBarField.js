import React from "react";
import { Form, TextArea } from "semantic-ui-react";

class SearchBarField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form.Field
        fluid
        control={TextArea}
        iconPosition="left"
        id={"search-form-input-control" + this.props.name}
        name={this.props.name}
        type={this.props.type}
        icon={this.props.icon}
        label={this.props.label}
        placeholder={this.props.placeholder}
        value={this.props.value}
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
export default SearchBarField;
