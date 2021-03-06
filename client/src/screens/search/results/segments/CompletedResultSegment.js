import React from "react";
import { observer } from "mobx-react";
import CommonSegment from "./CommonSegment";
import ActiveJobs from "./lists/ActiveJobs";
import IgnoredJobs from "./lists/IgnoredJobs";
import OtherJobs from "./lists/OtherJobs";
const CompletedResultSegment = props => {
  //Determine lists for subsections and formatting
  let jobsToDisplay = !props.company.jobs
    ? []
    : props.company.jobs
        .filter(el => !props.store.isIgnored(el))
        .map(el =>
          props.store.isActive(el) ? props.store.getActiveJob(el) : el
        );

  let jobsToIgnore = !props.company.jobs
    ? []
    : props.company.jobs
        .filter(el => props.store.isIgnored(el))
        .map(el => props.store.getIgnoredJob(el));

  //Formatting values for the current segment
  let segmentProps = jobsToDisplay.length > 0 ? {} : { secondary: true };
  const noJobs =
    jobsToDisplay.length === 0 &&
    jobsToIgnore.length === 0 &&
    props.company.otherJobs.length === 0;

  const noTitleJobs = props.company.otherJobs.some(
    el => el.title === "" || el.location === ""
  );

  if (noJobs) {
    segmentProps = { tertiary: true, color: "orange", inverted: true };
  }

  if (noTitleJobs) {
    segmentProps = { tertiary: true, color: "green", inverted: true };
  }

  return (
    <CommonSegment
      className="completedResult"
      style={segmentProps}
      company={props.company}
      store={props.store}
      redo={true}
    >
      <ActiveJobs
        store={props.store}
        company={props.company}
        jobs={jobsToDisplay}
      />

      <IgnoredJobs
        store={props.store}
        company={props.company}
        jobs={jobsToIgnore}
      />
      <OtherJobs
        store={props.store}
        company={props.company}
        jobs={props.company.otherJobs}
      />
    </CommonSegment>
  );
};

export default observer(CompletedResultSegment);
