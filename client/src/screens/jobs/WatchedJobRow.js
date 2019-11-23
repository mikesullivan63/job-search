import React from "react";
import JobListRow from "./JobListRow";
import IgnoreWatchedJobButton from "../common/buttons/IgnoreWatchedJobButton";
import ArchiveWatchedJobButton from "../common/buttons/ArchiveWatchedJobButton";

const WatchedJobRow = props => {
  return (
    <JobListRow store={props.store} job={props.job} callback={props.callback}>
      {(job, beforeCallback, afterCallback) => {
            <IgnoreWatchedJobButton
              store={props.store}
              job={props.job}
              beforeCallback={beforeCallback}
              afterCallback={afterCallback}
            />
            <ArchiveWatchedJobButton
              store={props.store}
              job={props.job}
              beforeCallback={beforeCallback}
              afterCallback={afterCallback}
            />
        }
      }}
    </JobListRow>
  );
};

export default WatchedJobRow;
