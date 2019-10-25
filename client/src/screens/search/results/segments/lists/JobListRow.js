import React from "react";
import { Grid } from "semantic-ui-react";

class JobListRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transitioning: false
    };
  }

  render() {
    return (
      <React.Fragment key={this.props.job.url}>
        <Grid.Column>
          <a
            href={this.props.job.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.job.title}
          </a>
        </Grid.Column>
        <Grid.Column>
          <span>{this.props.job.location}</span>
        </Grid.Column>
        {this.props.children &&
          this.props.children(this.props.job, event => {
            event.preventDefault();
            this.setState({ transitioning: true });
          })}
      </React.Fragment>
    );
  }
}

export default JobListRow;
