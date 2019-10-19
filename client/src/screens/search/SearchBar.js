import React from "react";
import { observer } from "mobx-react";
import { Button, Form } from "semantic-ui-react";
import SearchBarField from "./SearchBarField";
import { searchService } from "../../services/search";

import Results from "./Results";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      location: "",
      error: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit(event) {
    event.preventDefault();
    searchService.executeSearch(this.state.title, this.state.location);
  }

  componentDidMount() {
    searchService.loadCompanies();
    searchService
      .loadLastSearch()
      .then(res =>
        this.setState({
          title: res.title,
          location: res.location
        })
      )
      .catch(error => this.setState({ error: error }));
  }

  render() {
    return (
      <React.Fragment>
        <Form.Group widths="equal">
          <SearchBarField
            name="title"
            label="Role / Job Title"
            placeholder="Enter keywords separated by ' or '"
            value={this.state.title}
            handleChange={this.handleChange}
          />
          <SearchBarField
            name="location"
            label="Location"
            placeholder="Enter keywords separated by ' or '"
            value={this.state.location}
            handleChange={this.handleChange}
          />
        </Form.Group>
        <Form.Field
          id="search-form-search-button"
          control={Button}
          content="Search Jobs"
          label=""
          color="teal"
          fluid
          size="large"
          onClick={event => this.handleSubmit(event)}
        />
        <Results store={this.props.store} />
      </React.Fragment>
    );
  }
}

export default observer(SearchBar);
