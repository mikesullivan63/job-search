import React from "react";
import { Grid } from "semantic-ui-react";
import CollapsibleJobList from "../lists/CollapsibleJobList";
import WatchIgnoredJobButton from "../../../../common/buttons/WatchIgnoredJobButton";

const IgnoredJobs = props => {
  return (
    <CollapsibleJobList
      store={props.store}
      name="ignoredJobs"
      title="Ignored Jobs"
      columns={3}
      jobs={props.jobs}
    >
      {(job, beforeCallback, afterCallback) => (
        <Grid.Column>
          <WatchIgnoredJobButton
            store={props.store}
            company={props.company.company}
            {...{ job, beforeCallback, afterCallback }}
          />
        </Grid.Column>
      )}
    </CollapsibleJobList>
  );
};
export default IgnoredJobs;
