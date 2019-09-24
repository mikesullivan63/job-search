import React from 'react';
import styled from 'styled-components'
import {Grid, Cell} from 'react-foundation'


const StyledResultsArea = styled.div `
margin: 10px;
`

const StyledResultsCompanyName = styled.h4 `
margin: 0.1em;
`

const StyledResultsCompanyJobTitle = styled.span `
vertical-align: top;
`
const StyledResultsCompanyJobLocation = styled.span `
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
        <div>
            <Grid className="display">
                <Cell small={2}>
                    <a 
                        href={props.company.url} 
                        target="_blank" 
                        rel="noopener noreferrer">
                            <StyledResultsCompanyName>
                                {props.company.company}
                            </StyledResultsCompanyName>
                    </a>
                </Cell>
            </Grid>
                {props.company.state === 'PENDING' && 
                    <Cell small={6}>
                            <div>Pending Lookup</div>
                    </Cell>
                }

                {props.company.state !== 'PENDING' &&  ! props.company.error && (!(props.company.jobs)||props.company.jobs.length===0) &&
                    <Cell small={6}>
                        <div>No Matching Jobs</div>
                    </Cell>
                } 

                {props.company.state !== 'PENDING' &&  props.company.error &&
                    <Cell small={6}>
                        <div>Error: {props.company.error.substring(0,100)}</div>
                    </Cell>
                } 

                {props.company.state !== 'PENDING' &&  props.company.jobs && props.company.jobs.map(function(job, index){
                    return (
                        <Grid className="display">
                            <Cell small={3}>
                                <StyledResultsCompanyJobTitle>< a href={job.url} target="_blank" rel="noopener noreferrer">{job.title}</ a></StyledResultsCompanyJobTitle>
                            </Cell>
                            <Cell small={3}>
                                <StyledResultsCompanyJobLocation>{job.location}</StyledResultsCompanyJobLocation>
                            </Cell>
                        </Grid>
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
        <StyledResultsArea class="search-results grid-x grid-margin-x">
            {props && props.data? 
                props.data.map(function(company, index){
                    return (
                        <ResultsCompany key={company.company} company={company} />
                    );
                })
            : ( <div class="no-results">No Results</div> )
            }
        </StyledResultsArea>
    );
  }
  
  export default Results;