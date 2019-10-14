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
class Results extends React.Component {
  render() {
    return (
      <StyledResultsArea class="search-results grid-x grid-margin-x">
        {this.props.store.getSearchResults() ? (
          this.props.store.getSearchResults().map(company => {
            return (
              <Result
                store={this.props.store}
                key={company.company}
                company={company}
              />
            );
          })
        ) : (
          <div class="no-results">No Results</div>
        )}
      </StyledResultsArea>
    );
  }
}

export default observer(Results);
