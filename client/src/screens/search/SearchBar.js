import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Button, Colors } from "react-foundation";
import Cookies from "universal-cookie";
import Results from "./Results";
import { authenticationService } from "../../services/authentication";
import { comparators } from "../../models/comparators";

const cookies = new Cookies();
const StyledSearchBar = styled.div`
  margin: 10px;
`;

const updateStateWithFetch = (url, response) => {
  fetch(url, {
    headers: authenticationService.authHeader()
  })
    .then(res => res.json())
    .then(res => response(res))
    .catch(error =>
      console.log("Received error updating field from ", url, error)
    );
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: cookies.get("job-title"),
      location: cookies.get("job-location")
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    let target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  updateResults(data) {
    this.updateStateForProperty(
      "results",
      data.sort(comparators.boardComparator)
    );
  }

  setActiveJobs = () =>
    updateStateWithFetch("/job/active-jobs", res =>
      this.props.store.setActiveJobs(res)
    );
  setIgnoredJobs = () =>
    updateStateWithFetch("/job/active-jobs", res =>
      this.props.store.setIgnoredJobs(res)
    );

  postSearchCall = (title, location) => {
    //Post for history
    fetch("/user/search", {
      method: "POST",
      headers: {
        ...authenticationService.authHeader(),
        ...{ "Content-Type": "application/json" }
      },
      body: JSON.stringify({ title, location })
    }).catch(error => console.log("Error sending search history over"));
  };

  processBoard(board, title, location) {
    this.props.store.addSearchResult({
      company: board.company,
      url: board.url,
      status: "PENDING",
      jobs: []
    });
    title = title || " ";
    location = location || " ";

    console.log("processBoard", board);

    fetch("/api/" + board.company + "/" + title + "/" + location)
      .then(res => res.json())
      .then(result => this.props.store.addSearchResult(result))
      .catch(error => {
        console.log("Error processing board", board.company, error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    //Refresh job lists
    this.setActiveJobs();
    this.setIgnoredJobs();
    this.postSearchCall(this.state.title, this.state.location);

    this.props.store.getSearchResults().forEach(board => {
      console.log("Calling process: ", board);
      this.processBoard(
        board.toJSON(),
        this.state.title,
        this.state.location,
        this
      );
      console.log("Called process: ", board);
    });
  }

  componentDidMount() {
    fetch("/api/companies")
      .then(res => res.json())
      .then(data => {
        this.props.store.setSearchResults(
          data.companies.map(company => ({
            company: company.name,
            jobs: []
          }))
        );
      })
      .catch(error => console.log("Error loading boards: ", error));

    fetch("/user/last-search", {
      headers: authenticationService.authHeader()
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          title: res.title,
          location: res.location
        })
      )
      .catch(error => console.log("Error loading previous results: ", error));
  }

  render() {
    return (
      <React.Fragment>
        <StyledSearchBar>
          <form onSubmit={this.handleSubmit}>
            <div class="grid-x grid-margin-x">
              <label className="cell small-1  middle">Job Title:</label>
              <textarea
                name="title"
                className="cell small-3"
                rows={4}
                value={this.state.title}
                onChange={this.handleInputChange}
              />
              <label className="cell small-1  middle">Location:</label>
              <textarea
                name="location"
                className="cell small-3"
                rows={4}
                value={this.state.location}
                onChange={this.handleInputChange}
              />
              <Button
                type="submit"
                value="Search"
                color={Colors.PRIMARY}
                className="cell small-2"
              >
                Search
              </Button>
            </div>
          </form>
        </StyledSearchBar>
        <Results
          store={this.props.store}
          /*
          data={this.state.results}
          activeJobs={this.state.activeJobs}
          ignoredJobs={this.state.ignoredJobs}
          archiveCallback={this.archiveLink}
          watchCallback={this.watchLink}
          ignoreCallback={this.ignoreLink}
          */
        />
      </React.Fragment>
    );
  }
}

export default observer(SearchBar);
