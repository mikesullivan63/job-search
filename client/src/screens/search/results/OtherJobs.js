import React from "react";
import { Grid } from "semantic-ui-react";

const OtherJobs = props => {
  if (!props.jobs || props.jobs.length === 0) {
    return <span>No matching jobs found</span>;
  }

  return (
    <div className="collapsableJobsList">
      <Grid columns={2}>
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
            </React.Fragment>
          );
        })}
      </Grid>
    </div>
  );
};
export default OtherJobs;
