import React from "react";
import { observer } from "mobx-react";
import { Segment, Grid, Button } from "semantic-ui-react";
import JobListPage from "./JobListPage";
import WatchedJobRow from "./WatchedJobRow";
import { jobService } from "../../services/job";
import { searchService } from "../../services/search";
import { objectComparator } from "../../util/comparator";

const WatchedJobsPage = props => {
  return (
    <JobListPage
      store={props.store}
      setupList={searchService.setActiveJobs}
      retrieveList={props.store.getActiveJobs}
      lookupJob={jobService.getWatchedJobWithStatus}
      title="Watched Jobs"
    >
      {(job, parent) => (
        <WatchedJobRow
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

export default observer(WatchedJobsPage);
