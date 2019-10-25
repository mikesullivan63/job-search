import React from "react";
import { observer } from "mobx-react";
import { Segment, Grid, Button } from "semantic-ui-react";
import { setActiveJobs, searchService } from "../../services/search";

class WatchedJobsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
  }

  componentDidMount() {
    searchService.setActiveJobs();
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
          {this.props.store.getActiveJobs().map(job => {
            console.log("Job:", JSON.stringify(job, null, 2));

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
                  <Grid.Column>???</Grid.Column>
                </Grid>
              </Segment>
            );
          })}
        </Segment.Group>
      </div>
    );
  }
}

export default observer(WatchedJobsPage);
