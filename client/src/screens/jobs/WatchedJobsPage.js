import React from "react";
import { observer } from "mobx-react";
import { Segment, Grid, Button } from "semantic-ui-react";
import { searchService } from "../../services/search";

class WatchedJobsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: this.props.store.getActiveJobs()
    };
  }

  componentDidUpdate() {
    console.log(
      "Getting state on componentDidUpdate",
      JSON.stringify(this.state, null, 2)
    );
  }

  componentDidMount() {
    searchService.setActiveJobs();
    console.log(
      "Setting state on componentDidMount, before ",
      JSON.stringify(this.state, null, 2)
    );

    this.setState({
      jobs: this.props.store
        .getActiveJobs()
        .slice()
        .map(job => {
          const { _id, board, url, title, location } = job;
          return { _id, board, url, title, location, status: "PENDING" };
        })
    });

    console.log(
      "Setting state on componentDidMount, after ",
      JSON.stringify(this.state, null, 2)
    );

    this.state.jobs.forEach(job => {
      console.log("Fetching:  ", job.board, job.title);

      fetch(job.url)
        .then(response => {
          if (response.status == 200) {
            console.log(
              "Setting status for ",
              job.board,
              job.title,
              "to ACTIVE"
            );
            job.status = "ACTIVE";
          } else {
            console.log(
              "Setting status for ",
              job.board,
              job.title,
              "to INACTIVE"
            );
            job.status = "INACTIVE - " + response.statusText;
          }
        })
        .catch(error => {
          console.log("Setting status for ", job.board, job.title, "to ERROR");
          job.status = "ERROR - " + error;
        });
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
          {this.props.store.getActiveJobs().map(job => {
            //console.log("Job:", JSON.stringify(job, null, 2));

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
                    {fetch(job.url)
                      .then(response => {
                        if (response.status == 200) {
                          console.log(
                            "Setting status for ",
                            job.board,
                            job.title,
                            "to ACTIVE"
                          );
                          return "ACTIVE";
                        } else {
                          console.log(
                            "Setting status for ",
                            job.board,
                            job.title,
                            "to INACTIVE"
                          );
                          return "INACTIVE - " + response.statusText;
                        }
                      })
                      .catch(error => {
                        console.log(
                          "Setting status for ",
                          job.board,
                          job.title,
                          "to ERROR"
                        );
                        return "ERROR - " + error;
                      })}
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

export default observer(WatchedJobsPage);
