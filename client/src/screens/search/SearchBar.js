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
            activeJobs: [],
            ignoredJobs:[]
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

    setActiveJobs() {
        fetch("/jobs/active-jobs", {
            headers: authHeader()
        })
        .then(res => res.json())
        .then(res => this.setState({
            activeJobs: res
        }));

    }

    setIgnoredJobs() {
        fetch("/jobs/ignored-jobs", {
            headers: authHeader()
        })
        .then(res => res.json())
        .then(res => this.setState({
            ignoredJobs: res
          }));

    }

    handleSubmit(event) {
        event.preventDefault();
        
        this.setActiveJobs();
        this.setIgnoredJobs();

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

    archiveLink(board, url, title, location) {
          fetch("/job/ignore-job", {
            method: 'POST', 
            headers: {
                    ...authHeader(),
                    ...{'Content-Type': 'application/json'}
                },
                body: JSON.stringify({
                    board: board, 
                    url: url, 
                    title: title,
                    location: location
                })
            })
          .then(res => res.json())
          .then(this.setIgnoredJobs())
          .catch(reason => console.log("Error: " + reason))    }
    
    watchLink(board, url, title, location) {
        fetch("/job/add-job", {
            method: 'POST', 
            headers: {
                    ...authHeader(),
                    ...{'Content-Type': 'application/json'}
                },
                body: JSON.stringify({
                    board: board, 
                    url: url, 
                    title: title,
                    location: location
                })
            })
          .then(res => res.json())
          .then(this.setActiveJobs())
          .catch(reason => console.log("Error: " + reason))
          //Error handling??        
    }

    archiveLink(jobId) {
        fetch("/job/archive-job", {
            method: 'POST', 
            headers: {
                    ...authHeader(),
                    ...{'Content-Type': 'application/json'}
                },
                body: JSON.stringify({
                    jobId: jobId
                })
            })
          .then(res => res.json())
          .then(res => {
              this.setActiveJobs(); 
              this.setIgnoredJobs();
          })
          .catch(reason => console.log("Error: " + reason))
          //Error handling??        
    }

    componentDidMount() {
        fetch("/api/companies")
        .then(res => res.json())
        .then(data => this.setState({
            results: data.companies.map(company => ({
                company: company.name, jobs: []
            }))
        }));

        fetch("/user/last-search", {
            headers: authHeader()
        })
        .then(res => res.json())
        .then(res => this.setState({
            title: res.title,
            location: res.location
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
                <Results 
                    data={this.state.results} 
                    activeJobs={this.state.activeJobs} 
                    ignoredJobs={this.state.ignoredJobs}
                    archiveCallback={this.archiveLink}
                    watchCallback={this.watchLink}
                    ignoreCallback={this.ignoreCallback}                    
                    />
            </React.Fragment>
        );
    }
}

export default SearchBar;