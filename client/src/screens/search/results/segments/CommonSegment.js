import React from "react";
import { Segment } from "semantic-ui-react";

const CommonSegment = props => (
  <Segment {...props.style}>
    <a href={props.company.url} target="_blank" rel="noopener noreferrer">
      <h4>{props.company.company}</h4>
    </a>
    {props.children}
  </Segment>
);

export default CommonSegment;
