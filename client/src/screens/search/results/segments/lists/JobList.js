import React from "react";
import { Grid } from "semantic-ui-react";
import JobListRow from "./JobListRow";

const JobList = props => {
  return (
    <Grid columns={props.columns}>
      {props.jobs.map(job => {
        return <JobListRow key={job.url} job={job} children={props.children} />;
      })}
    </Grid>
  );
};

export default JobList;
