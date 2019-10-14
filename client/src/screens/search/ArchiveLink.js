import React from "react";
import { observer } from "mobx-react";
import { commonMethods } from "./common";

class ArchiveLink extends React.Component {
  archiveLink = (event, jobId) =>
    commonMethods.addJobToList(event, { jobId }, "/job/archive-job", result => {
      console.log("Callback in archiveLink");
      this.props.store.archiveActiveJob(jobId);
    });

  render() {
    return (
      <button
        className="jobToggleButton"
        onClick={event => {
          console.log("In archiveLink", this.props.job._id);
          this.archiveLink(event, this.props.job._id);
        }}
      >
        Archive
      </button>
    );
  }
}

export default observer(ArchiveLink);
