import React from "react";
import CommonButton from "./CommonButton";
import { jobService } from "../../../services/job";

const WatchIgnoredJobButton = props => {
  return (
    <CommonButton
      className="watchIgnoredButton"
      label="Watch"
      callback={event => {
        props.beforeCallback(event);
        jobService.watchIgnoredJob(props.job._id, props.afterCallback);
      }}
    />
  );
};

export default WatchIgnoredJobButton;
