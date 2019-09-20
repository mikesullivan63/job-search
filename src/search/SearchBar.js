import React from 'react';
import styled from 'styled-components'
import './SearchBar.css';
import Results from '../results/Results';

const StyledSearchBar = styled.div `
width: 80%
padding: 0.5em;
margin: 0.5em;
border: 1px black ;
`

const StyledSearchBarLabel = styled.label `
width: 200px
`

const StyledSearchBarInput = styled.input `
width: 200px
`

const StyledSearchBarButton = styled.input `
width: 100px
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
            <React.Fragment>
                <StyledSearchBar >
                    <form onSubmit={this.handleSubmit}>
                        <StyledSearchBarLabel> 
                            Job Title:
                            <StyledSearchBarInput 
                                type="text" 
                                name="title" 
                                value={this.state.title} 
                                onChange={this.handleInputChange} 
                            />
                        </StyledSearchBarLabel>
                        <StyledSearchBarLabel>
                            Location:
                            <StyledSearchBarInput 
                                type="text" 
                                name="location" 
                                value={this.state.location} 
                                onChange={this.handleInputChange} 
                            />
                        </StyledSearchBarLabel>
                        <StyledSearchBarButton type="submit" value="Search" />
                    </form> 
                </StyledSearchBar>

                <Results data={this.state.results}/>
            </React.Fragment>
        );
    }
}

export default SearchBar;