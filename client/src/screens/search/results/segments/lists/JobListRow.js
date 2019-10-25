import React from "react";
import { Grid } from "semantic-ui-react";
import JobDetails from "./JobDetails";

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
        <JobDetails job={this.props.job} />
        {this.props.children(this.props.job, event => {
          event.preventDefault();
          this.setState({ transitioning: true });
        })}
      </React.Fragment>
    );
  }
}

export default JobListRow;
