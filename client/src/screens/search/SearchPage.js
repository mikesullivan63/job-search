import React from "react";
import SearchBar from "./searchbar/SearchBar";
import Results from "./results/Results";

const SearchPage = props => {
  return (
    <div class="searchPage">
      <SearchBar store={props.store} />
      <Results store={props.store} />
    </div>
  );
};

export default SearchPage;
