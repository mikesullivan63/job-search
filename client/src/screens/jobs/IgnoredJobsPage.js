import React from "react";
import { observer } from "mobx-react";
import { Segment, Grid, Button } from "semantic-ui-react";
import IgnoredJobRow from "./IgnoredJobRow";
import { jobService } from "../../services/job";
import { searchService } from "../../services/search";
import { objectComparator } from "../../util/comparator";

class IgnoredJobsPage extends React.Component {
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
      .setIgnoredJobs()
      .then(result => {
        this.setState({
          jobs: this.props.store
            .getIgnoredJobs()
            .slice()
            .map(job => {
              job.status = "Pending";
              return job;
            })
            .sort(objectComparator(["board", "title", "location", "url"]))
        });

        this.state.jobs.forEach(job => {
          jobService
            .getIgnoredJobWithStatus(job._id)
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
        <h2>Ignored Jobs ({this.state.jobs.length})</h2>
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
            this.state.jobs.map(job => {
              return (
                <IgnoredJobRow
                  store={this.props.store}
                  job={job}
                  callback={jobId => {
                    this.setState({
                      jobs: this.state.jobs
                        .slice()
                        .filter(el => el._id.toString() !== jobId)
                    });
                  }}
                />
              );
            })}
        </Segment.Group>
      </div>
    );
  }
}

export default observer(IgnoredJobsPage);
