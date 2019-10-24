import React from "react";
import { Form, Input } from "semantic-ui-react";

const ProfileTextField = props => {
  const errorsTrimmed = props.errors
    .slice()
    .filter(el => el && el !== null && el !== "null");

  const otherProps = {};
  if (props.type) {
    otherProps.type = props.type;
  }
  if (props.icon) {
    otherProps.icon = props.icon;
  }
  if (props.required) {
    otherProps.required = props.required;
  }

  return (
    <Form.Field
      fluid
      control={Input}
      iconPosition="left"
      id={props.form + "-form-input-control" + props.name}
      name={props.name}
      {...otherProps}
      label={props.label}
      placeholder={props.placeholder ? props.placeholder : props.label}
      value={props.value}
      error={errorsTrimmed.length > 0 ? errorsTrimmed : null}
      onChange={props.handleChange}
    />
  );
};
export default ProfileTextField;
