import React from "react";
import { Segment, Grid, Button } from "semantic-ui-react";
import { jobService } from "../../services/job";

class WatchedJobsPage extends React.Component {
  constructor(props) {
    super(props);
    const jobs = this.props.store
      .getActiveJobs()
      .slice()
      .map(job => {
        job.status = "Pending";
        return job;
      });

    this.state = {
      jobs: jobs
    };
  }

  componentDidMount() {
    this.state.jobs.forEach(job => {
      job = jobService.getWatchedJobsWithStatus(job._id);
      
    });

    this.setState({
      jobs: 
    });
  }

  render() {
    return (
      <div class="jobListPage">
        <Segment.Group>
          <Segment inverted color="black">
            <Grid columns={5}>
              <Grid.Column>Company</Grid.Column>
              <Grid.Column>Title</Grid.Column>
              <Grid.Column>Location</Grid.Column>
              <Grid.Column>Link</Grid.Column>
              <Grid.Column>Status</Grid.Column>
            </Grid>
          </Segment>
          {this.state.jobs &&
            this.state.jobs.map(job => {
              return (
                <Segment key={job._id}>
                  <Grid columns={5}>
                    <Grid.Column>{job.board}</Grid.Column>
                    <Grid.Column>{job.title}</Grid.Column>
                    <Grid.Column>{job.location}</Grid.Column>
                    <Grid.Column>
                      <Button
                        as="a"
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link to Posting
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      {typeof job.satus === "undefined" && "Pending"}
                      {typeof job.satus !== "undefined" && job.satus}
                    </Grid.Column>
                  </Grid>
                </Segment>
              );
            })}
        </Segment.Group>
      </div>
    );
  }
}

export default WatchedJobsPage;
