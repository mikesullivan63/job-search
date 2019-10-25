import React from "react";
import CommonButton from "./CommonButton";
import { jobService } from "../../../../../services/job";

const IgnoreJobButton = props => {
  return (
    <CommonButton
      className="ignoreButton"
      label="Ignore"
      callback={event => {
        props.callback(event);
        jobService.ignoreJob(
          props.company,
          props.job.url,
          props.job.title,
          props.job.location
        );
      }}
    />
  );
};

export default IgnoreJobButton;
