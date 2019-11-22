import React from "react";
import SearchBar from "./searchbar/SearchBar";
import Results from "./results/Results";
import OtherJobsCloud from "./tagcould/OtherJobsCloud";

const SearchPage = props => {
  return (
    <div class="searchPage">
      <SearchBar store={props.store} />
      <Results store={props.store} />
      <OtherJobsCloud store={props.store} />
    </div>
  );
};

export default SearchPage;
