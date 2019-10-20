import React from "react";
import { observer } from "mobx-react";
import { Grid, Column } from "semantic-ui-react";
import Result from "./Result";

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid columns={3} doubling stackable className="resultsGrid">
        {this.props.store.getSearchResults().map(company => {
          return (
            <Grid.Column>
              <Result
                store={this.props.store}
                key={company.company}
                company={company}
              />
            </Grid.Column>
          );
        })}
      </Grid>
    );
  }
}

export default observer(Results);
