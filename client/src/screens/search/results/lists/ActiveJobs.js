import React from "react";
import { Grid } from "semantic-ui-react";
import WatchJobButton from "../buttons/WatchJobButton";
import IgnoreJobButton from "../buttons/IgnoreJobButton";
import ArchiveJobButton from "../buttons/ArchiveJobButton";

const ActiveJobs = props => {
  if (!props.jobs || props.jobs.length === 0) {
    return <span>No matching jobs found</span>;
  }

  return (
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
              {job._id && <ArchiveJobButton store={props.store} job={job} />}
              {!job._id && (
                <React.Fragment>
                  <WatchJobButton
                    store={props.store}
                    job={job}
                    company={props.company.company}
                  />
                  <IgnoreJobButton
                    store={props.store}
                    job={job}
                    company={props.company.company}
                  />
                </React.Fragment>
              )}
            </Grid.Column>
          </React.Fragment>
        );
      })}
    </Grid>
  );
};
export default ActiveJobs;
