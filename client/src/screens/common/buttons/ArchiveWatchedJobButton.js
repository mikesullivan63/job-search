import React from "react";
import CommonButton from "./CommonButton";
import { jobService } from "../../../services/job";

const IgnoreWatchedJobButton = props => {
  return (
    <CommonButton
      className="ignoreWatchedButton"
      label="Archive"
      callback={event => {
        props.beforeCallback(event);
        jobService.archiveWatchedJob(props.job._id, props.afterCallback);
      }}
    />
  );
};

export default IgnoreWatchedJobButton;
