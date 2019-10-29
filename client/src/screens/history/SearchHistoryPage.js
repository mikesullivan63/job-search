import React, { useState, useEffect } from "react";
import { Segment, Grid, Pagination } from "semantic-ui-react";
import { searchService } from "../../services/search";

const SearchHistoryPage = props => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (!total) {
      //Call search history and load
      searchService.getSearchHistory(1, pageSize).then(result => {
        setTotal(result.total);
        setHistory(result.results);
      });
    }
  });

  const handleOnPageChange = (event, data) => {
    //Query history based on page data
    //Range = [pageSize*(page-1) + 1] to [pageSize*(page)]
    setPage(data.activePage);
    searchService
      .getSearchHistory(pageSize * (data.activePage - 1) + 1, pageSize)
      .then(result => {
        setTotal(result.total);
        setHistory(result.results);
      })
      .catch(error => alert("Error: " + error));
  };

  return (
    <div class="searchHistoryPage">
      <h2>Search History</h2>
      <div>
        Showing results {pageSize * (page - 1) + 1} to {pageSize * page} of{" "}
        {total}
      </div>
      <Pagination
        boundaryRange={0}
        defaultActivePage={page}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={total / pageSize + 1}
        onPageChange={handleOnPageChange}
      />
      <div></div>
      <Segment.Group>
        <Segment inverted color="black">
          <Grid columns={3}>
            <Grid.Column>Time</Grid.Column>
            <Grid.Column>Title</Grid.Column>
            <Grid.Column>Location</Grid.Column>
          </Grid>
        </Segment>
        {history.map(search => {
          return (
            <Grid columns={3}>
              <Grid.Column>{search.time}</Grid.Column>
              <Grid.Column>{search.title}</Grid.Column>
              <Grid.Column>{search.location}</Grid.Column>
            </Grid>
          );
        })}
      </Segment.Group>
    </div>
  );
};

export default SearchHistoryPage;
