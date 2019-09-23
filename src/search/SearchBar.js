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
            title: 'Engineering Manager',
            location: 'Remote',
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
        //alert("A name was submitted: '" + this.state.title + "' and '" + this.state.location + "'");
        event.preventDefault();
        this.state.results.forEach(board => this.processBoard(board, this.state.title, this.state.location, this));
        //this.updateResults(data);
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

        //console.log('Calling to process board: ' + board.company);
        fetch("http://localhost:4000/api/" + board.company + "/" + title + "/" + location)
          .then(res => res.json())
          .then(result => this.updateBoardResults(result,  caller));
          //console.log('Calling to process board: ' + board.company + ' - Done');
    }

    updateBoardResults(result,  caller) {
        let newResults = caller.state.results.slice(); 
        const index = newResults.findIndex((element) => element.company === result.company);

        result.state = 'COMPLETED';
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
            <StyledSearchBar>
                <form onSubmit={this.handleSubmit}>
                    <div class="grid-x grid-margin-x">
                        <label className="cell small-1">Job Title:</label>
                        <input 
                            type="text" 
                            name="title" 
                            className="cell small-3"
                            value={this.state.title} 
                            onChange={this.handleInputChange} 
                        />
                        <label className="cell small-1">Location:</label>
                        <input 
                            type="text" 
                            name="location" 
                            className="cell small-3"
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

                <Results data={this.state.results}/>
            </StyledSearchBar>
        );
    }
}

export default SearchBar;