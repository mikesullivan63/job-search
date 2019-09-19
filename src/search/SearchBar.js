import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            location: null,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        alert("A name was submitted: '" + this.state.title + "' and '" + this.state.location + "'");
        event.preventDefault();
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label> 
                    Job Title:
                    <input 
                        type="text" 
                        name="title" 
                        value={this.state.title} 
                        onChange={this.handleInputChange} 
                    />
                </label>
                <br />
                <label>
                    Location:
                    <input 
                        type="text" 
                        name="location" 
                        value={this.state.location} 
                        onChange={this.handleInputChange} 
                    />
                </label>
                <input type="submit" value="Search" />
            </form> 
        );
    }
}

export default SearchBar;