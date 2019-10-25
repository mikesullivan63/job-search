import React from "react";
import { Grid } from "semantic-ui-react";

const JobDetails = props => {
  return (
    <React.Fragment>
      <Grid.Column>
        <a href={props.job.url} target="_blank" rel="noopener noreferrer">
          {props.job.title}
        </a>
      </Grid.Column>
      <Grid.Column>
        <span>{props.job.location}</span>
      </Grid.Column>
    </React.Fragment>
  );
};

export default JobDetails;
