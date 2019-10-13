import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Grid, Cell } from "react-foundation";
import { ResultsCompany } from "./Result";

const StyledResultsArea = styled.div`
  margin: 10px;
`;

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
        props.data.map(function(company, index) {
          return (
            <ResultsCompany
              store={store}
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
