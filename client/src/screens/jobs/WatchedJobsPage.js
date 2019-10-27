import React from "react";
import { observer } from "mobx-react";
import { Segment, Grid, Button } from "semantic-ui-react";
import { jobService } from "../../services/job";
import { searchService } from "../../services/search";
import { objectComparator } from "../../util/comparator";

class WatchedJobsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
  }

  updateJobResult(job) {
    const newJobs = this.state.jobs.slice();
    newJobs[newJobs.findIndex(el => el.url === job.url)] = job;
    this.setState({
      jobs: newJobs
    });
  }

  componentDidMount() {
    searchService
      .setActiveJobs()
      .then(result => {
        this.setState({
          jobs: this.props.store
            .getActiveJobs()
            .slice()
            .map(job => {
              job.status = "Pending";
              return job;
            })
        });

        this.state.jobs.forEach(job => {
          jobService
            .getWatchedJobWithStatus(job._id)
            .then(newJobs => this.updateJobResult(newJobs))
            .catch(error => {
              console.log(
                "Error looking up job: ",
                JSON.stringify(job, null, 2)
              );
              job.status = "Error: " + error;
              this.updateJobResult(job);
            });
        });
      })
      .catch(error => {
        console.log("Error loading page", error);
      });
  }

  render() {
    return (
      <div class="jobListPage">
        <h2>Watched Jobs ({this.state.jobs.length})</h2>
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
                    <Grid.Column>{job.status}</Grid.Column>
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
