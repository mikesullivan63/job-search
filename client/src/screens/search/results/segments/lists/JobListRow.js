import React from "react";
import { Grid, Dimmer } from "semantic-ui-react";

class JobListRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transitioning: false
    };
  }

  render() {
    return (
      <Dimmer.Dimmable
        key={this.props.job.url}
        as={Grid.Row}
        blurring
        dimmed={this.state.transitioning}
      >
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
          this.props.children(
            this.props.job,
            event => {
              event.preventDefault();
              this.setState({ transitioning: true });
            },
            () => this.setState({ transitioning: false })
          )}
      </Dimmer.Dimmable>
    );
  }
}

export default JobListRow;
