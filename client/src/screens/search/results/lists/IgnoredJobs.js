import React from "react";
import { Grid } from "semantic-ui-react";
import WatchIgnoredJobButton from "../buttons/WatchIgnoredJobButton";

const IgnoredJobs = props => {
  if (!props.jobs || props.jobs.length === 0) {
    return <span>No matching jobs found</span>;
  }

  return (
    <div className="collapsableJobsList">
      <Grid columns={3}>
        {props.jobs.map(job => {
          return (
            <React.Fragment key={job.url}>
              <Grid.Column>
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  {job.title}
                </a>
              </Grid.Column>
              <Grid.Column>
                <span>{job.location}</span>
              </Grid.Column>
              <Grid.Column>
                <React.Fragment>
                  <WatchIgnoredJobButton
                    store={props.store}
                    job={job}
                    company={props.company.company}
                  />
                </React.Fragment>
              </Grid.Column>
            </React.Fragment>
          );
        })}
      </Grid>
    </div>
  );
};
export default IgnoredJobs;
