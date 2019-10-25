import React from "react";
import { observer } from "mobx-react";
import { jobService } from "../../../../../services/job";

const ArchiveJobButton = props => {
  return (
    <button
      className="jobToggleButton archiveButton"
      onClick={event => {
        jobService.archiveJob(event, props.job._id);
      }}
    >
      Archive
    </button>
  );
};

export default observer(ArchiveJobButton);
