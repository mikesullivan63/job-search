import React from "react";
import CommonButton from "./CommonButton";
import { jobService } from "../../../../../services/job";

const WatchJobButton = props => {
  return (
    <CommonButton
      className="watchButton"
      label="Watch"
      callback={event => {
        props.callback(event);
        jobService.watchJob(
          props.company,
          props.job.url,
          props.job.title,
          props.job.location
        );
      }}
    />
  );
};

export default WatchJobButton;
