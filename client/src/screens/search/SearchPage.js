import React from "react";
import { observer } from "mobx-react";
import SearchBar from "./searchbar/SearchBar";
import Results from "./results/Results";
import { searchService } from "../../services/search";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    searchService.loadCompanies();
  }

  render() {
    return (
      <div class="searchPage">
        <SearchBar store={this.props.store} />
        <Results store={this.props.store} />
      </div>
    );
  }
}

export default observer(SearchPage);
