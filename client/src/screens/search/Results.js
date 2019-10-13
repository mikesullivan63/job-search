import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import Result from "./Result";

const StyledResultsArea = styled.div`
  margin: 10px;
`;

/*
    Object coming in should look like this:
    [
        {
            company: Company Name
            jobs: [{
                title: Job Title,
                location: Job Location,
                url: URL to posting
            }]
        },...
    ]
*/
function Results(props) {
  return (
    <StyledResultsArea class="search-results grid-x grid-margin-x">
      {props && props.data ? (
        props.data.map(function(company) {
          return (
            <Result
              store={props.store}
              key={company.company}
              company={company}
              /*
              activeJobs={props.activeJobs}
              ignoredJobs={props.ignoredJobs}
              archiveCallback={props.archiveCallback}
              watchCallback={props.watchCallback}
              ignoreCallback={props.ignoreCallback}
              */
            />
          );
        })
      ) : (
        <div class="no-results">No Results</div>
      )}
    </StyledResultsArea>
  );
}

export default observer(Results);
