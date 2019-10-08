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
        this.archiveLink = this.archiveLink.bind(this);
        this.watchLink = this.watchLink.bind(this);
        this.ignoreLink = this.ignoreLink.bind(this);
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

    setFieldFromUrl(url, field) {
        fetch(url, {
            headers: authHeader()
        })
        .then(res => res.json())
        .then(res => this.setState({
                [field]: res
        }));
    }
    setActiveJobs = () => this.setFieldFromUrl("/job/active-jobs","activeJobs");
    setIgnoredJobs = () => this.setFieldFromUrl("/job/ignored-jobs","ignoredJobs");
 
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


    addJobToList(event, data, url, updateCallback) {
        event.preventDefault();

        fetch(url, {
            method: 'POST', 
            headers: {
                ...authHeader(),
                ...{'Content-Type': 'application/json'}
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => updateCallback(res))
        .catch(reason => console.log("Error: " + reason));
    }
    ignoreLink = (event, board, url, title, location) => this.addJobToList( event, 
                                                                            {board: board, url: url, title: title,location: location},
                                                                            "/job/ignore-job", 
                                                                            (result) => {
                                                                                console.log("result: " + JSON.stringify(result));
                                                                                this.setState({ignoredJobs: result})
                                                                            });

    watchLink = (event, board, url, title, location) => this.addJobToList(  event, 
                                                                            {board: board, url: url, title: title,location: location}, 
                                                                            "/job/add-job", 
                                                                            (result) => {
                                                                                console.log("result: " + JSON.stringify(result));
                                                                                this.setState({activeJobs: result})
                                                                            });

    archiveLink = (event, jobId) => this.addJobToList(  event, 
                                                        {jobId: jobId}, 
                                                        "/job/archive-job", 
                                                        (result) => this.setState({activeJobs: result.active, ignoredJobs: result.ignored}))

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
                    ignoreCallback={this.ignoreLink}    
                    />
            </React.Fragment>
        );
    }
}

export default SearchBar;