import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Grid, Cell } from "react-foundation";
import { authenticationService } from "../../services/authentication";

const StyledResultsCompanyName = styled.h4`
  margin: 0.1em;
`;

const StyledResultsCompanyJobTitle = styled.span`
  vertical-align: top;
`;
const StyledResultsCompanyJobLocation = styled.span`
  vertical-align: top;
`;

/*
    Object coming in should look like this:
    {
        company: Company Name
        jobs: [{
            title: Job Title,
            location: Job Location,
            url: URL to posting
        }]
    }
*/

const addJobToList = function(event, data, url, updateCallback) {
  event.preventDefault();

  fetch(url, {
    method: "POST",
    headers: {
      ...authenticationService.authHeader(),
      ...{ "Content-Type": "application/json" }
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => updateCallback(res))
    .catch(reason => console.log("Error: " + reason));
};

function ArchiveLink(props) {
  const archiveLink = (event, jobId) =>
    addJobToList(event, { jobId }, "/job/archive-job", result => {
      this.props.store.setActiveJobs(result.active);
      this.props.store.setIgnoredJobs(result.ignored);
    });

  return (
    <button
      className="jobToggleButton"
      onClick={event => {
        props.archiveLink(event, props.job._id);
      }}
    >
      Archive
    </button>
  );
}

function WatchLink(props) {
  const watchLink = (event, board, url, title, location) =>
    addJobToList(
      event,
      { board, url, title, location },
      "/job/add-job",
      result => this.propp.store.setActiveJobs(result)
    );

  return (
    <button
      className="jobToggleButton"
      onClick={event => {
        props.watchCallback(
          event,
          props.company,
          props.job.url,
          props.job.title,
          props.job.location
        );
      }}
    >
      Watch
    </button>
  );
}

function IgnoreLink(props) {
  const ignoreLink = (event, board, url, title, location) =>
    addJobToList(
      event,
      { board, url, title, location },
      "/job/ignore-job",
      result => this.propp.store.setIgnoredJobs(result)
    );

  return (
    <button
      className="jobToggleButton"
      onClick={event => {
        props.ignoreCallback(
          event,
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
}

function ResultsCompanyJob(props) {
  return (
    <Grid className="display">
      <Cell small={4} medium={3} large={4}>
        <StyledResultsCompanyJobTitle>
          <a href={props.job.url} target="_blank" rel="noopener noreferrer">
            {props.job.title}
          </a>
        </StyledResultsCompanyJobTitle>
      </Cell>
      <Cell small={4} medium={3} large={4}>
        <StyledResultsCompanyJobLocation>
          {props.job.location}
        </StyledResultsCompanyJobLocation>
      </Cell>
      <Cell small={2} medium={1} large={1}>
        {props.job.isActive && (
          <ArchiveLink store={props.store} job={props.job} />
        )}
        {!props.job.isActive && (
          <WatchLink
            store={props.store}
            job={props.job}
            company={props.company.company}
          />
        )}
      </Cell>
      <Cell small={2} medium={1} large={1}>
        {!props.job.isActive && (
          <IgnoreLink
            store={props.store}
            job={props.job}
            company={props.company.company}
          />
        )}
      </Cell>
    </Grid>
  );
}

function Result(props) {
  let displayStyle = "callout";
  let displayMessage = "";

  if (
    props.company.state === "PENDING" ||
    props.company.state === "" ||
    !props.company.state
  ) {
    displayStyle = "callout";
    displayMessage = "Pending Lookup";
  } else if (props.company.state === "ERROR") {
    displayStyle = "callout alert";
    displayMessage = "Error: " + props.company.error.substring(0, 100);
  } else if (props.company.state === "COMPLETED") {
    displayStyle =
      "callout " +
      (!props.company.jobs || props.company.jobs.length === 0
        ? "secondary"
        : "primary");
    displayMessage =
      !props.company.jobs || props.company.jobs.length === 0
        ? "No Matching Jobs"
        : "";
  }

  console.log("Displaying list");

  let jobsToDisplay = props.company.jobs
    .filter(el => !this.props.store.isIgnored(el))
    .map(el => {
      el.isActive = this.props.store.isActive(el);
      return el;
    })
    .sort();

  return (
    <div className={displayStyle}>
      <Grid className="display">
        <Cell small={6} medium={4} large={4}>
          <a href={props.company.url} target="_blank" rel="noopener noreferrer">
            <StyledResultsCompanyName>
              {props.company.company}
            </StyledResultsCompanyName>
          </a>
        </Cell>
        {displayMessage !== "" && (
          <Cell small={6} medium={6} large={4} className="result-message">
            {displayMessage}
          </Cell>
        )}
      </Grid>
      {jobsToDisplay.map(job => {
        return (
          <ResultsCompanyJob
            store={props.store}
            job={job}
            company={props.company}
          />
        );
      })}
    </div>
  );
}

export default observer(Result);
