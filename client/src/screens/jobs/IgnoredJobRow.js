import React from "react";
import JobListRow from "./JobListRow";
import WatchIgnoredJobButton from "../common/buttons/WatchIgnoredJobButton";
import ArchiveIgnoredJobButton from "../common/buttons/ArchiveIgnoredJobButton";

const IgnoredJobRow = props => {
  return (
    <JobListRow store={props.store} job={props.job} callback={props.callback}>
      {(job, beforeCallback, afterCallback) => {
        if (job.status === "Active") {
          return (
            <WatchIgnoredJobButton
              store={props.store}
              job={props.job}
              beforeCallback={beforeCallback}
              afterCallback={afterCallback}
            />
          );
        } else {
          return (
            <ArchiveIgnoredJobButton
              store={props.store}
              job={props.job}
              beforeCallback={beforeCallback}
              afterCallback={afterCallback}
            />
          );
        }
      }}
    </JobListRow>
  );
};

export default IgnoredJobRow;
