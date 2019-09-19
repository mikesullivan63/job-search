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
function ResultsCompany(props) {
    return (
      <div className="Company">
          <h2>{props.company.company}</h2>
          {props.company.jobs && props.company.jobs.map(function(job, index){
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
      if(props.results) {
        alert('Props: ' + props)
        alert('Props.results: ' + props.data)
        alert('Props.results[0].company: ' + props.data[0].company)  
      }
    return (
        <div class="search-results">
            {props && props.data? 
                props.data.map(function(company, index){
                    alert('index: ' + index + ' company:' + company)
                    return (
                        <ResultsCompany key={company.company} company={company} />
                    );
                })
            : ( <div class="no-results">No Results</div> )
            }
        </div>
    );
  }
  
  export default Results;