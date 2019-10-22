import React from "react";
import { Form, Input } from "semantic-ui-react";

const ProfileTextField = props => {
  return (
    <Form.Field
      fluid
      control={Input}
      iconPosition="left"
      id={props.form + "-form-input-control" + props.name}
      name={props.name}
      type={props.type}
      icon={props.icon}
      label={props.label}
      placeholder={props.placeholder}
      error={props.errors && props.errors.length > 0 ? props.errors : null}
      onChange={props.handleChange}
    />
  );
};
export default ProfileTextField;
