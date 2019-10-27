import React from "react";
import CommonButton from "./CommonButton";
import { jobService } from "../../../services/job";

const IgnoreWatchedJobButton = props => {
  return (
    <CommonButton
      className="ignoreWatchedButton"
      label="Ignore"
      callback={event => {
        props.beforeCallback(event);
        jobService.ignoreWatchedJob(props.job._id, props.afterCallback);
      }}
    />
  );
};

export default IgnoreWatchedJobButton;
