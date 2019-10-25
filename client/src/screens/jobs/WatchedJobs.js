import React from "react";
import { observer } from "mobx-react";
import SearchBar from "./searchbar/SearchBar";
import Results from "./results/Results";
import { searchService } from "../../services/search";

const WatchedPage = props => {
    return (
      <div class="searchPage">
        <SearchBar store={props.store} />
        <Results store={props.store} />
      </div>
    );
  }
}

export default WatchedPage;
