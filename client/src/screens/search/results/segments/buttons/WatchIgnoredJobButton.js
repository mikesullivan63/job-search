import React from "react";
import { observer } from "mobx-react";
import { jobService } from "../../../../../services/job";

const WatchIgnoredJobButton = props => {
  return (
    <button
      className="jobToggleButton watchIgnoredButton"
      onClick={event => {
        jobService.watchIgnoredJob(event, props.job._id);
      }}
    >
      Watch
    </button>
  );
};

export default observer(WatchIgnoredJobButton);
