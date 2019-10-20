import React from "react";
import { observer } from "mobx-react";
import { jobService } from "../../../services/job";

class WatchJobButton extends React.Component {
  render() {
    return (
      <button
        className="jobToggleButton watchButton"
        onClick={event => {
          jobService.watchJob(
            event,
            this.props.company,
            this.props.job.url,
            this.props.job.title,
            this.props.job.location
          );
        }}
      >
        Watch
      </button>
    );
  }
}

export default observer(WatchJobButton);
