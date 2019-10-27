import React from "react";
import { Grid } from "semantic-ui-react";
import JobList from "../lists/JobList";
import WatchJobButton from "../../../../common/buttons/WatchJobButton";
import IgnoreJobButton from "../../../../common/buttons/IgnoreJobButton";
import IgnoreWatchedJobButton from "../../../../common/buttons/IgnoreWatchedJobButton";

const ActiveJobs = props => {
  return (
    <div className="activeJobs">
      {(!props.jobs || props.jobs.length === 0) && (
        <span>No matching jobs found</span>
      )}
      {props.jobs && props.jobs.length > 0 && (
        <JobList store={props.store} columns={3} jobs={props.jobs}>
          {(job, beforeCallback, afterCallback) => (
            <Grid.Column>
              {job._id && (
                <IgnoreWatchedJobButton
                  store={props.store}
                  {...{ job, beforeCallback, afterCallback }}
                />
              )}
              {!job._id && (
                <React.Fragment>
                  <WatchJobButton
                    store={props.store}
                    company={props.company.company}
                    {...{ job, beforeCallback, afterCallback }}
                  />
                  <IgnoreJobButton
                    store={props.store}
                    company={props.company.company}
                    {...{ job, beforeCallback, afterCallback }}
                  />
                </React.Fragment>
              )}
            </Grid.Column>
          )}
        </JobList>
      )}
    </div>
  );
};
export default ActiveJobs;
