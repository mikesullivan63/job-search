import React from "react";
import { Grid } from "semantic-ui-react";
import JobList from "../lists/JobList";
import WatchJobButton from "../buttons/WatchJobButton";
import IgnoreJobButton from "../buttons/IgnoreJobButton";
import ArchiveJobButton from "../buttons/ArchiveJobButton";

const ActiveJobs = props => {
  return (
    <div className="activeJobs">
      {(!props.jobs || props.jobs.length === 0) && (
        <span>No matching jobs found</span>
      )}
      {props.jobs && props.jobs.length > 0 && (
        <JobList store={props.store} columns={3} jobs={props.jobs}>
          {(/*store, company,*/ job) => (
            <Grid.Column>
              {job._id && <ArchiveJobButton store={props.store} job={job} />}
              {!job._id && (
                <React.Fragment>
                  <WatchJobButton
                    store={props.store}
                    job={job}
                    company={props.company.company}
                  />
                  <IgnoreJobButton
                    store={props.store}
                    job={job}
                    company={props.company.company}
                  />
                </React.Fragment>
              )}
            </Grid.Column>
          )}
        </JobList>
      )}
    </div>
  );
};
export default ActiveJobs;
