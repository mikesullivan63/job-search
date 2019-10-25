import React from "react";
import { Grid } from "semantic-ui-react";
import JobDetails from "./JobDetails";

const JobList = props => {
  return (
    <Grid columns={props.columns}>
      {props.jobs.map(job => {
        return (
          <React.Fragment key={job.url}>
            <JobDetails job={job} />
            {props.children(job)}
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default JobList;
