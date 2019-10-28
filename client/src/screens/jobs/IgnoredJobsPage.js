import React from "react";
import JobListPage from "./JobListPage";
import IgnoredJobRow from "./IgnoredJobRow";
import { jobService } from "../../services/job";
import { searchService } from "../../services/search";

const IgnoredJobsPage = props => {
  return (
    <JobListPage
      store={props.store}
      setupList={searchService.setIgnoredJobs}
      retrieveList={props.store.getIgnoredJobs}
      lookupJob={jobService.getIgnoredJobWithStatus}
      title="Ignored Jobs"
    >
      {(job, parent) => (
        <IgnoredJobRow
          store={props.store}
          job={job}
          callback={jobId => {
            parent.setState({
              jobs: parent.state.jobs
                .slice()
                .filter(el => el._id.toString() !== jobId)
            });
          }}
        />
      )}
    </JobListPage>
  );
};

export default IgnoredJobsPage;
