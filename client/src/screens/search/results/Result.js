import React from "react";
import PendingResultSegment from "./segments/PendingResultSegment";
import ErrorResultSegment from "./segments/ErrorResultSegment";
import CompletedResultSegment from "./segments/CompletedResultSegment";

const Result = props => {
  if (props.company.status === "PENDING" || !props.company.status) {
    return (
      <PendingResultSegment
        key={props.company.company}
        company={props.company}
      />
    );
  } else if (props.company.status === "ERROR") {
    return (
      <ErrorResultSegment key={props.company.company} company={props.company} />
    );
  } else {
    return (
      <CompletedResultSegment
        store={props.store}
        key={props.company.company}
        company={props.company}
      />
    );
  }
};

export default Result;
