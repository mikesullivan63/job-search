import React from "react";
import { Grid, Accordion, Icon } from "semantic-ui-react";

class OtherJobs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  render() {
    return (
      <Accordion className="otherJobs">
        <Accordion.Title
          index="other"
          active={this.state.expanded}
          onClick={event => this.setState({ expanded: !this.state.expanded })}
        >
          <Icon name="dropdown" />
          Other Jobs ({!this.props.jobs ? 0 : this.props.jobs.length})
        </Accordion.Title>
        <Accordion.Content active={this.state.expanded}>
          <div className="collapsableJobsList">
            <Grid columns={2}>
              {this.props.jobs.map(job => {
                return (
                  <React.Fragment key={job.url}>
                    <Grid.Column>
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {job.title}
                      </a>
                    </Grid.Column>
                    <Grid.Column>
                      <span>{job.location}</span>
                    </Grid.Column>
                  </React.Fragment>
                );
              })}
            </Grid>
          </div>
        </Accordion.Content>
      </Accordion>
    );
  }
}
export default OtherJobs;
