import React from "react";
import { observer } from "mobx-react";
import { jobService } from "../../../../../services/job";

const WatchJobButton = props => {
  return (
    <button
      className="jobToggleButton watchButton"
      onClick={event => {
        jobService.watchJob(
          event,
          props.company,
          props.job.url,
          props.job.title,
          props.job.location
        );
      }}
    >
      Watch
    </button>
  );
};

export default observer(WatchJobButton);
