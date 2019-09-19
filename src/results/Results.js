import React from 'react';
import './Results.css';


/*
    Object coming in should look like this:
    {
        company: Company Name
        jobs: [{
            title: Job Title,
            location: Job Location,
            url: URL to posting
        }]
    }
*/
function ResultsCompany() {
    return (
      <div className="Company">
          <h2>{this.props.company}</h2>
          {this.props.jobs.map(function(job, index){
                    return (
                        <div className="Job">
                            <div className="JobTitle">{job.title}</div>
                            <div className="JobLocation">{job.location}</div>
                            <div className="JobLink">< a href={job.url}>Link</a></div>
                        </div>
          )})}          
      </div>
    );
  }
  
  /*
    Object coming in should look like this:
    [
        {
            company: Company Name
            jobs: [{
                title: Job Title,
                location: Job Location,
                url: URL to posting
            }]
        },...
    ]
*/
  function Results(props) {
    return (
        <div class="search-results">
            {props && props.results? 
                props.results.map(function(company, index){
                    return (
                        <ResultsCompany props={company} />
                    );
                })
            : ( <div class="no-results">No Results</div> )
            }
        </div>
    );
  }
  
  export default Results;