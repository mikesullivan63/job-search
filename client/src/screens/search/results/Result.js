import React from "react";
import PendingResult from "./PendingResult";
import ErrorResult from "./ErrorResult";
import CompletedResult from "./CompletedResult";

const Result = props => {
  if (props.company.status === "PENDING" || !props.company.status) {
    return (
      <PendingResult key={props.company.company} company={props.company} />
    );
  } else if (props.company.status === "ERROR") {
    return <ErrorResult key={props.company.company} company={props.company} />;
  } else {
    return (
      <CompletedResult
        store={props.store}
        key={props.company.company}
        company={props.company}
      />
    );
  }
};

export default Result;
