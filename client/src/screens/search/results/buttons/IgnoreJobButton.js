import React from "react";
import { jobService } from "../../../../services/job";

const IgnoreJobButton = props => {
  return (
    <button
      className="jobToggleButton ignoreButton"
      onClick={event =>
        jobService.ignoreJob(
          event,
          props.company,
          props.job.url,
          props.job.title,
          props.job.location
        )
      }
    >
      Ignore
    </button>
  );
};

export default IgnoreJobButton;
