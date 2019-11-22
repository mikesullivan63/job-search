import React from "react";
import { observer } from "mobx-react";
import { Grid } from "semantic-ui-react";
import Result from "./Result";

const Results = props => {
  return (
    <Grid columns={3} doubling stackable className="resultsGrid">
      {props.store.getSearchResults().map(company => {
        return (
          <Grid.Column>
            <Result
              store={props.store}
              key={company.company}
              company={company}
            />
          </Grid.Column>
        );
      })}
    </Grid>
  );
};

export default observer(Results);
