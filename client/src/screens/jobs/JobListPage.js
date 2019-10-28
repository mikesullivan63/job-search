import React from "react";
import { observer } from "mobx-react";
import { Segment, Grid, Button } from "semantic-ui-react";
import { objectComparator } from "../../util/comparator";

class JobListPage extends React.Component {
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
    this.props
      .setupList()
      .then(result => {
        this.setState({
          jobs: this.props
            .retrieveList()
            .slice()
            .map(job => {
              job.status = "Pending";
              return job;
            })
            .sort(objectComparator(["board", "title", "location", "url"]))
        });

        this.state.jobs.forEach(job => {
          this.props
            .lookupJob(job._id)
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
        <h2>
          {this.props.title} ({this.state.jobs.length})
        </h2>
        <Segment.Group>
          <Segment inverted color="black">
            <Grid columns={6}>
              <Grid.Column>Company</Grid.Column>
              <Grid.Column>Title</Grid.Column>
              <Grid.Column>Location</Grid.Column>
              <Grid.Column>Link</Grid.Column>
              <Grid.Column>Status</Grid.Column>
            </Grid>
          </Segment>
          {this.state.jobs &&
            this.props.children &&
            this.state.jobs.map(job => {
              return this.props.children(job, this);
            })}
        </Segment.Group>
      </div>
    );
  }
}

export default observer(JobListPage);
