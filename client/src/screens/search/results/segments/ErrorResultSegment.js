import React from "react";
import CommonSegment from "./CommonSegment";

const ErrorResultSegment = props => (
  <CommonSegment
    style={{ inverted: true, color: "red", secondary: true }}
    company={props.company}
    message={props.company.error}
  />
);

export default ErrorResultSegment;
