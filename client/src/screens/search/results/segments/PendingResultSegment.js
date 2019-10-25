import React from "react";
import CommonSegment from "./CommonSegment";

const PendingResultSegment = props => (
  <CommonSegment style={{ tertiary: true }} company={props.company}>
    <span>Pending Lookup</span>
  </CommonSegment>
);

export default PendingResultSegment;
