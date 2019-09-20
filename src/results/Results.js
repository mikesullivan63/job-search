import React from 'react';
import styled from 'styled-components'

const StyledResultsCompany = styled.div `
width: 932px;
padding: 0.1em;
border: 1px solid black ;
`

const StyledResultsCompanyName = styled.h4 `
margin: 0.1em;
`

const StyledResultsCompanyJob = styled.div `
width: 900px;
margin: 0.1em;
border: 1px black ;
text-align:top;
`

const StyledResultsCompanyJobTitle = styled.span `
width: 400px;
display:inline-block;
vertical-align: top;
`
const StyledResultsCompanyJobLocation = styled.span `
width: 400px;
display:inline-block;
vertical-align: top;
`

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
      <StyledResultsCompany >
          <StyledResultsCompanyName>{props.company.company}</StyledResultsCompanyName>
          {props.company.jobs && props.company.jobs.map(function(job, index){
                    return (
                        <StyledResultsCompanyJob>
                            <StyledResultsCompanyJobTitle>< a href={job.url} target="_blank" rel="noopener noreferrer">{job.title}</ a></StyledResultsCompanyJobTitle>
                            <StyledResultsCompanyJobLocation>{job.location}</StyledResultsCompanyJobLocation>
                        </StyledResultsCompanyJob>
          )})}          
      </StyledResultsCompany>
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
                    //alert('index: ' + index + ' company:' + company)
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