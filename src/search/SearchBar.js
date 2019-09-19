import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            location: null,
        };
    }

    render() {
        <form>
            <label> 
                Job Title:
                <input type="text" value={this.state.title} onChange={this.handleChange} />
            </label>
            <br />
            <label>
                Location:
                <input type="text" value={this.state.location} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Search" />
        </form>
    }
}

export default SearchBar;