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

    console.log(props.company.company + ' ' + props.company.state + ' ' + props.company.jobs);

    return (
      <StyledResultsCompany >
            <a href={props.company.url} target="_blank" rel="noopener noreferrer"><StyledResultsCompanyName>{props.company.company} </StyledResultsCompanyName></a>
            {props.company.state === 'PENDING' && 
                        <StyledResultsCompanyJob>Pending Lookup</StyledResultsCompanyJob>
            }

            {props.company.state !== 'PENDING' &&  (!(props.company.jobs)||props.company.jobs.length===0) &&
                        <StyledResultsCompanyJob>No Matching Jobs</StyledResultsCompanyJob>
            } 

            {props.company.state !== 'PENDING' &&  props.company.jobs && props.company.jobs.map(function(job, index){
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
    return (
        <div class="search-results">
            {props && props.data? 
                props.data.map(function(company, index){
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