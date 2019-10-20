import React from "react";
import { observer } from "mobx-react";
import SearchBar from "./searchbar/SearchBar";
import Results from "./results/Results";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
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
