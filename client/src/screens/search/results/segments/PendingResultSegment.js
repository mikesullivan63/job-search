import React from "react";
import { Segment } from "semantic-ui-react";

const PendingResultSegment = props => (
  <Segment tertiary>
    <a href={props.company.url} target="_blank" rel="noopener noreferrer">
      <h4>{props.company.company}</h4>
    </a>
    <span>Pending Lookup</span>
  </Segment>
);

export default PendingResultSegment;
