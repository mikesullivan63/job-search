import React from "react";
import CommonButton from "./CommonButton";
import { jobService } from "../../../../../services/job";

const ArchiveJobButton = props => {
  return (
    <CommonButton
      className="archiveButton"
      label="Archive"
      callback={event => {
        props.beforeCallback(event);
        jobService.archiveJob(props.job._id, props.afterCallback);
      }}
    />
  );
};

export default ArchiveJobButton;
