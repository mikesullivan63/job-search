import React from 'react';
import styled  from 'styled-components'
import { Button, Colors } from 'react-foundation'
import Cookies from 'universal-cookie';
import Results from './Results';
import { authenticationService, authHeader } from '../../services/authentication';

const cookies = new Cookies();
const StyledSearchBar = styled.div `
margin: 10px;
`
class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: cookies.get("job-title"),
            location: cookies.get("job-location"),
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
        
        cookies.set("job-title", this.state.title, { path: '/' });
        cookies.set("job-location", this.state.location, { path: '/' });

        //Post for history

        fetch("/user/search", {
            method: 'POST', 
            headers: {
                    ...authHeader(),
                    ...{'Content-Type': 'application/json'}
                },
                body: JSON.stringify({
                    title: this.state.title,
                    location: this.state.location
                })
            })
          .then(res => res.json())
          //Error handling??

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

        fetch("/api/" + board.company + "/" + title + "/" + location)
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
        fetch("/api/companies")
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