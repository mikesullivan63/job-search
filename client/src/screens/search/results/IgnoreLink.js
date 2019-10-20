import React from "react";
import { observer } from "mobx-react";
import { commonMethods } from "./common";

function ignoreLink(event, store, board, url, title, location) {
  console.log("IgnoreLink clicked: ", url, title, location);
  commonMethods.addJobToList(
    event,
    { board, url, title, location },
    "/job/ignore-job",
    result => store.addIgnoredJob(result.find(el => el.url === url))
  );
}

const IgnoreLink = props => {
  return (
    <button
      className="jobToggleButton ignoreButton"
      onClick={event => {
        ignoreLink(
          event,
          props.store,
          props.company,
          props.job.url,
          props.job.title,
          props.job.location
        );
      }}
    >
      Ignore
    </button>
  );
};

export default IgnoreLink;
