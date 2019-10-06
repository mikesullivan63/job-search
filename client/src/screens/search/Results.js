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

    //console.log(props.company.company + ' ' + props.company.state + ' ' + props.company.jobs);

    let displayStyle = "callout"
    let displayMessage = ""

    if(props.company.state === 'PENDING' || props.company.state === '' || !props.company.state) {
        displayStyle = "callout"
        displayMessage = "Pending Lookup"
    } else if(props.company.state === 'ERROR') {
        displayStyle = "callout alert"
        displayMessage = "Error: " + props.company.error.substring(0,100)     
    } else if(props.company.state === 'COMPLETED') {        
        displayStyle = "callout " + ((!props.company.jobs||props.company.jobs.length===0)?"secondary":"primary")
        displayMessage = (!props.company.jobs||props.company.jobs.length===0)?"No Matching Jobs":""
    }    

    return (
        <div className={displayStyle}>
            <Grid className="display">
                <Cell small={6} medium={4} large={4} >
                    <a 
                        href={props.company.url} 
                        target="_blank" 
                        rel="noopener noreferrer">
                            <StyledResultsCompanyName>
                                {props.company.company}
                            </StyledResultsCompanyName>
                    </a>
                </Cell>

                {displayMessage !== "" && 
                    <Cell small={6} medium={6} large={4} className="result-message">{displayMessage}</Cell>
                }
            </Grid>


                {props.company.state === 'COMPLETED' &&  
                    props.company.jobs && 
                    props.company.jobs.filter((job, index) => {
                        if(props.ignoredJobs && props.ignoredJobs.length > 0) {
                            return !props.ignoredJobs.some((el, index) => { 
                                return el.board === props.company.company && el.url === job.url;
                            })    
                        }
                        return true;
                    }).map((job, index) => {
                        var matchedJob = null;

                        if(props.activeJobs && props.activeJobs.length > 0) {
                            matchedJob = props.activeJobs.find((el, index) => { 
                                return el.board === props.company.company && el.url === job.url;
                            });
                        }
                        var isActive = (matchedJob !== null);    
                        
                    return (
                        <Grid className="display">
                            <Cell small={4} medium={3} large={4}>
                                <StyledResultsCompanyJobTitle>
                                    < a href={job.url} target="_blank" rel="noopener noreferrer">{job.title}</ a>
                                    </StyledResultsCompanyJobTitle>
                            </Cell>
                            <Cell small={4} medium={3} large={4}>
                                <StyledResultsCompanyJobLocation>{job.location}</StyledResultsCompanyJobLocation>
                            </Cell>
                            <Cell small={2} medium={1} large={1}>
                                {isActive && < a href="#" onClick={() => {props.archiveCallback(matchedJob._id);}}>Archive</ a>}
                                {!isActive && < a href="#" onClick={() => {props.watchCallback(props.company.company, job.url, job.title, job.location);}}>Watch</ a>}
                            </Cell>
                            <Cell small={2} medium={1} large={1}>
                                {!isActive && < a href="#" onClick={() => {props.ignoreCallback(props.company.company, job.url, job.title, job.location);}}>Ignore</ a>}
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