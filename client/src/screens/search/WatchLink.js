import React from "react";
import { observer } from "mobx-react";
import { commonMethods } from "./common";

class WatchLink extends React.Component {
  watchLink = (event, board, url, title, location) =>
    commonMethods.addJobToList(
      event,
      { board, url, title, location },
      "/job/add-job",
      result => this.props.store.addActiveJob(result.find(el => el.url === url))
    );

  render() {
    return (
      <button
        className="jobToggleButton"
        onClick={event => {
          this.watchLink(
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

export default observer(WatchLink);
