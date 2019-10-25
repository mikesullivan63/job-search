import React from "react";
import { Grid, Dimmer } from "semantic-ui-react";

class JobListRow extends React.Component {
  _isMounted = false; //Used to prevent Asynchronous updates to unmounted rows
  constructor(props) {
    super(props);
    this.state = {
      transitioning: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
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
              if (this._isMounted) {
                this.setState({ transitioning: true });
              }
            },
            () => {
              if (this._isMounted) {
                this.setState({ transitioning: false });
              }
            }
          )}
      </Dimmer.Dimmable>
    );
  }
}

export default JobListRow;
