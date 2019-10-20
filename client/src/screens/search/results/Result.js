import React from "react";
import PendingResult from "./PendingResult";

const Result = props => {
  //  if (props.company.status === "PENDING") {
  return <PendingResult key={props.company.company} company={props.company} />;
  //}
};

export default Result;
