import React from "react";
import CommonSegment from "./CommonSegment";

const PendingResultSegment = props => (
  <CommonSegment
    style={{ tertiary: true }}
    company={props.company}
    message={"Pending Lookup"}
  />
);

export default PendingResultSegment;
