import React from 'react';
import styled  from 'styled-components'
import {Button, Colors} from 'react-foundation'
import Results from '../results/Results';


const StyledSearchBar = styled.div `
margin: 10px;
`

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Engineering Manager or director or vp or Engineer Manager',
            location: 'Remote or us or nation or baton or orleans or home or anywhere',
            results: [],
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

    updateResults(data) {
        this.setState({
          results: data
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.state.results.forEach(board => this.processBoard(board, this.state.title, this.state.location, this));
    }

    processBoard(board, title, location, caller) {
        let newResults = caller.state.results.slice(); 
        const index = newResults.findIndex((element) => element.company === board.company);

        if(index !== -1){
            newResults[index].state = 'PENDING';
            this.setState({
                results: newResults
            });
        } 

        fetch("http://localhost:4000/api/" + board.company + "/" + title + "/" + location)
          .then(res => res.json())
          .then(result => this.updateBoardResults(result,  caller));
    }

    updateBoardResults(result,  caller) {
        let newResults = caller.state.results.slice(); 
        const index = newResults.findIndex((element) => element.company === result.company);

        result.state = result.error?'ERROR':'COMPLETED';
        (index === -1) ? newResults.concat(result) : newResults[index] = result;

        this.setState({
            results: newResults
        });
    }

    componentDidMount() {
        fetch("http://localhost:4000/api/companies")
        .then(res => res.json())
        .then(data => this.setState({
                results: data.companies.map(company => ({
                    company: company.name, jobs: []
                }))
        }));
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
                <Results data={this.state.results}/>
            </React.Fragment>

        );
    }
}

export default SearchBar;