import React from "react";
import { Form, Input } from "semantic-ui-react";

const ProfileTextField = props => {
  const errorsTrimmed = props.errors
    .slice()
    .filter(el => el && el !== null && el !== "null");
  return (
    <Form.Field
      inline
      //width={16}
      control={Input}
      iconPosition="left"
      id={props.form + "-form-input-control" + props.name}
      name={props.name}
      type={props.type}
      icon={props.icon}
      label={props.label}
      placeholder={props.placeholder}
      value={props.value}
      error={errorsTrimmed.length > 0 ? errorsTrimmed : null}
      onChange={props.handleChange}
    />
  );
};
export default ProfileTextField;
