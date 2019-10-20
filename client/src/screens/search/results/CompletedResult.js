import React from "react";
import { Segment, Grid } from "semantic-ui-react";
import WatchLink from "./WatchLink";
import IgnoreLink from "./IgnoreLink";
import ArchiveLink from "./ArchiveLink";

class CompletedResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ignoredExpanded: false,
      otherExpanded: false
    };
  }

  render() {
    let jobsToDisplay = !this.props.company.jobs
      ? null
      : this.props.company.jobs
          .filter(el => !this.props.store.isIgnored(el))
          .map(el =>
            this.props.store.isActive(el)
              ? this.props.store.getActiveJob(el)
              : el
          );

    return (
      <Segment>
        <a
          href={this.props.company.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4>{this.props.company.company}</h4>
        </a>
        <Grid columns={3}>
          {jobsToDisplay.map(job => {
            return (
              <React.Fragment>
                <Grid.Column>
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    {job.title}
                  </a>
                </Grid.Column>
                <Grid.Column>
                  <span>{job.location}</span>
                </Grid.Column>
                <Grid.Column>
                  {job._id && (
                    <ArchiveLink store={this.props.store} job={job} />
                  )}
                  {!job._id && (
                    <React.Fragment>
                      <WatchLink
                        store={this.props.store}
                        job={job}
                        company={this.props.company.company}
                      />
                      <IgnoreLink
                        store={this.props.store}
                        job={job}
                        company={this.props.company.company}
                      />
                    </React.Fragment>
                  )}
                </Grid.Column>
              </React.Fragment>
            );
          })}
        </Grid>
      </Segment>
    );
  }
}

export default CompletedResult;
