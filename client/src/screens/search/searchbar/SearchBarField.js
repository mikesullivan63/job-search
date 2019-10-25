import React from "react";
import { Form, TextArea } from "semantic-ui-react";

const SearchBarField = props => {
  return (
    <Form.Field
      fluid
      control={TextArea}
      iconPosition="left"
      id={"search-form-input-control" + props.name}
      name={props.name}
      type={props.type}
      icon={props.icon}
      label={props.label}
      placeholder={props.placeholder}
      value={props.value}
      error={props.errors && props.errors.length > 0 ? props.errors : null}
      onChange={props.handleChange}
    />
  );
};
export default SearchBarField;
