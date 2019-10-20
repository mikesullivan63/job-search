import React from "react";
import { Grid } from "semantic-ui-react";
import WatchLink from "./WatchLink";
import IgnoreLink from "./IgnoreLink";
import ArchiveLink from "./ArchiveLink";

const OtherJobs = props => {
  if (!props.jobs || props.jobs.length === 0) {
    return <span>No matching jobs found</span>;
  }

  return (
    <div className="collapsableJobsList">
      <Grid columns={3}>
        {props.jobs.map(job => {
          return (
            <React.Fragment>
              <Grid.Column>
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  {job.title}
                </a>
              </Grid.Column>
              <Grid.Column>
                <span>{job.location}</span>
              </Grid.Column>
              <Grid.Column>
                {!job._id && (
                  <React.Fragment>
                    <span>Re-watch?</span>
                  </React.Fragment>
                )}
              </Grid.Column>
            </React.Fragment>
          );
        })}
      </Grid>
    </div>
  );
};
export default OtherJobs;
