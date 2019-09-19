import React from 'react';
import './SearchBar.css';
import Results from '../results/Results';
import processGreenhouse from '../processors/greenhouse/Greenhouse';


const GreenhouseBoards = [
    {name: "InVision", url:"invision", notes: "Design tool"},
    {name: "Abstract", url:"abstract", notes: "Sketch platform"},
]

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        let results = [];
        results = results.concat(GreenhouseBoards.map(board => ({company: board.name})));

        this.state = {
            title: null,
            location: null,
            results: results,
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
        alert(data[0].company)
        this.setState({
          results: data
        });
    }

    handleSubmit(event) {
        alert("A name was submitted: '" + this.state.title + "' and '" + this.state.location + "'");
        event.preventDefault();

        let data = [{
            company: "Company Name #1",
            jobs: [{
                title: "Job Title #1",
                location: "Job Location #1",
                url: "URL-to-posting-1"
            }]
        },{
            company: "Company Name #2",
            jobs: [{
                    title: "Job Title #2",
                    location: "Job Location #2",
                    url: "URL-to-posting-2"
                },
                {
                    title: "Job Title #3",
                    location: "Job Location #3",
                    url: "URL-to-posting-3"
            }]
        }];
        //data = data.concat(processGreenhouse('https://boards.greenhouse.io/invision/'));

        this.updateResults(data);
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