import React from "react";
import CommonButton from "./CommonButton";
import { jobService } from "../../../../../services/job";

const WatchIgnoredJobButton = props => {
  return (
    <CommonButton
      className="watchIgnoredButton"
      label="Watch"
      callback={event => {
        props.callback(event);
        jobService.watchIgnoredJob(props.job._id);
      }}
    />
  );
};

export default WatchIgnoredJobButton;
