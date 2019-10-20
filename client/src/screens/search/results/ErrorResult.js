import React from "react";
import { Segment } from "semantic-ui-react";

const ErrorResult = props => (
  <Segment inverted color="red" secondary>
    <a href={props.company.url} target="_blank" rel="noopener noreferrer">
      <h4>{props.company.company}</h4>
    </a>
    <span>{props.company.error}</span>
  </Segment>
);

export default ErrorResult;
