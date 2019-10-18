import React from "react";
import { observer } from "mobx-react";
import { commonMethods } from "./common";

class IgnoreLink extends React.Component {
  ignoreLink = (event, board, url, title, location) =>
    commonMethods.addJobToList(
      event,
      { board, url, title, location },
      "/job/ignore-job",
      result =>
        this.props.store.addIgnoredJob(result.find(el => el.url === url))
    );

  render() {
    return (
      <button
        className="jobToggleButton ignoreButton"
        onClick={event => {
          this.ignoreLink(
            event,
            this.props.company,
            this.props.job.url,
            this.props.job.title,
            this.props.job.location
          );
        }}
      >
        Ignore
      </button>
    );
  }
}

export default observer(IgnoreLink);
