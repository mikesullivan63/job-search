import React from "react";
import CollapsibleJobList from "./CollapsibleJobList";

const OtherJobs = props => {
  return (
    <CollapsibleJobList
      store={props.store}
      name="otherJobs"
      title="Other Jobs"
      columns={2}
      jobs={props.jobs}
    />
  );
};
export default OtherJobs;
