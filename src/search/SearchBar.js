import React from 'react';
import './SearchBar.css';
import Results from '../results/Results';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            location: null,
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
        alert("A name was submitted: '" + this.state.title + "' and '" + this.state.location + "'");
        event.preventDefault();

        this.state.results.forEach(board => this.processBoard(board, this.state.title, this.state.location, this));

        //this.updateResults(data);
    }

    processBoard(board, title, location, caller) {
        console.log('Calling to process board: ' + board.company);
        fetch("http://localhost:4000/api/" + board.company + "/" + title + "/" + location)
          .then(res => res.json())
          .then(result => this.updateBoardResults(result,  caller));
          console.log('Calling to process board: ' + board.company + ' - Done');
    }

    updateBoardResults(result,  caller) {

        console.log('Processsing result for ' + result.company + ': ' + result);
        console.log('this.state.results: ' +  caller.state.results); 

        let newResults = this.state.results.splice(); 
        console.log('newResults: ' + newResults); 
        
        const index = newResults.findIndex((element) => {
            console.log('comparing : ' + element.company + ' to ' + result.company); 
            return element.company === result.company
        } );

        console.log('Processsing result for ' + result.company + ': index: ' + index);

        if(index === -1) {
            newResults.concat(result);
        } else {
            alert('replacing item at ' + index); 
            newResults[index] = result;
        }

        console.log('newResults: ' + newResults); 
        console.log('newResults length: ' + newResults.length); 

        this.setState({
            results: newResults
          });

        console.log('Processsing result for ' + result.company + ': Done');

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
                <div class="search-bar">
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
                        <br />
                        <input type="submit" value="Search" />
                    </form> 
                </div>

                <Results data={this.state.results}/>
            </React.Fragment>
        );
    }
}

export default SearchBar;