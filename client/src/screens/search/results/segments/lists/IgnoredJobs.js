import React from "react";
import { Grid } from "semantic-ui-react";
import CollapsibleJobList from "../lists/CollapsibleJobList";
import WatchIgnoredJobButton from "../buttons/WatchIgnoredJobButton";

const IgnoredJobs = props => {
  return (
    <CollapsibleJobList
      store={props.store}
      name="ignoredJobs"
      title="Ignored Jobs"
      columns={3}
      jobs={props.jobs}
    >
      {(job, callback) => (
        <Grid.Column>
          <WatchIgnoredJobButton
            store={props.store}
            job={job}
            company={props.company.company}
            callback={callback}
          />
        </Grid.Column>
      )}
    </CollapsibleJobList>
  );
};
export default IgnoredJobs;
