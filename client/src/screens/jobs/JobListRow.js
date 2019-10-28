import React from "react";
import { Segment, Grid, Dimmer, Button } from "semantic-ui-react";
import IgnoreWatchedJobButton from "../common/buttons/IgnoreWatchedJobButton";
import ArchiveWatchedJobButton from "../common/buttons/ArchiveWatchedJobButton";

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

  beforeTransitionCallback = event => {
    event.preventDefault();
    if (this._isMounted) {
      this.setState({ transitioning: true });
    }
  };

  afterTransitionCallback = () => {
    if (this._isMounted) {
      this.setState({ transitioning: false });
      this.props.callback(this.props.job._id.toString());
    }
  };

  render() {
    return (
      <Dimmer.Dimmable
        key={this.props.job._id}
        as={Segment}
        blurring
        dimmed={this.state.transitioning}
      >
        <Grid columns={6}>
          <Grid.Column>{this.props.job.board}</Grid.Column>
          <Grid.Column>{this.props.job.title}</Grid.Column>
          <Grid.Column>{this.props.job.location}</Grid.Column>
          <Grid.Column>
            <Button
              as="a"
              href={this.props.job.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link to Posting
            </Button>
          </Grid.Column>
          <Grid.Column>{this.props.job.status}</Grid.Column>
          <Grid.Column>
            {this.props.children &&
              this.props.children(
                this.props.job,
                this.beforeTransitionCallback,
                this.afterTransitionCallback
              )}
          </Grid.Column>
        </Grid>
      </Dimmer.Dimmable>
    );
  }
}

export default JobListRow;
