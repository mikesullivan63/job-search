import React from "react";
import { observer } from "mobx-react";
import { Grid } from "semantic-ui-react";
import Result from "./Result";
import { searchService } from "../../../services/search";

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    searchService.loadCompanies();
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
