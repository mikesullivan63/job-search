import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Grid, Cell } from "react-foundation";
import WatchLink from "./WatchLink";
import IgnoreLink from "./IgnoreLink";
import ArchiveLink from "./ArchiveLink";

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
        {props.job._id && <ArchiveLink store={props.store} job={props.job} />}
        {!props.job._id && (
          <WatchLink
            store={props.store}
            job={props.job}
            company={props.company.company}
          />
        )}
      </Cell>
      <Cell small={2} medium={1} large={1}>
        {!props.job._id && (
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

class Result extends React.Component {
  render() {
    let displayStyle = "callout";
    let displayMessage = "";

    if (
      this.props.company.status === "PENDING" ||
      this.props.company.status === "" ||
      !this.props.company.status
    ) {
      displayStyle = "callout";
      displayMessage = "Pending Lookup";
    } else if (this.props.company.status === "ERROR") {
      displayStyle = "callout alert";
      displayMessage = "Error: " + this.props.company.error.substring(0, 100);
    } else if (this.props.company.status === "COMPLETED") {
      displayStyle =
        "callout " +
        (!this.props.company.jobs || this.props.company.jobs.length === 0
          ? "secondary"
          : "primary");
      displayMessage =
        !this.props.company.jobs || this.props.company.jobs.length === 0
          ? "No Matching Jobs"
          : "";
    }
    let jobsToDisplay = this.props.company.jobs
      .filter(el => !this.props.store.isIgnored(el))
      .map(el =>
        this.props.store.isActive(el) ? this.props.store.getActiveJob(el) : el
      );
    return (
      <div className={displayStyle}>
        <Grid className="display">
          <Cell small={6} medium={4} large={4}>
            <a
              href={this.props.company.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledResultsCompanyName>
                {this.props.company.company}
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
              store={this.props.store}
              job={job}
              company={this.props.company}
            />
          );
        })}
      </div>
    );
  }
}

export default observer(Result);
