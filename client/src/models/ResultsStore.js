import { types, detach, destroy } from "mobx-state-tree";
import Job from "./Job";
import Board from "./Board";
import { objectComparator } from "../util/comparator";

const ResultsStore = types
  .model("ResultsStore", {
    activeJobs: types.array(Job),
    ignoredJobs: types.array(Job),
    searchResults: types.array(Board)
  })
  .actions(self => ({
    setActiveJobs(jobs) {
      self.activeJobs = jobs;
    }
  }))
  .actions(self => ({
    addActiveJob(job) {
      self.activeJobs.push(job);
    }
  }))
  .actions(self => ({
    archiveActiveJob(jobId) {
      let temp = self.activeJobs.find(el => el._id === jobId);
      self.ignoredJobs.push(detach(temp));
    }
  }))
  .actions(self => ({
    setIgnoredJobs(jobs) {
      self.ignoredJobs = jobs;
    }
  }))
  .actions(self => ({
    addIgnoredJob(job) {
      self.ignoredJobs.push(job);
    }
  }))
  .actions(self => ({
    setSearchResults(boards) {
      self.searchResults.replace(
        boards.slice().sort(objectComparator("company"))
      );
    }
  }))
  .actions(self => ({
    addSearchResult(board) {
      //Mutable
      let loc = self.searchResults.findIndex(
        el => el.company === board.company
      );
      let temp = self.searchResults[loc];
      self.searchResults[loc] = board;
      destroy(temp);
    }
  }))
  .views(self => ({
    isIgnored(job) {
      return self.ignoredJobs.some(el => el.url === job.url);
    },
    isActive(job) {
      return self.activeJobs.some(el => el.url === job.url);
    },
    getActiveJob(job) {
      return self.activeJobs.find(el => el.url === job.url);
    },
    getIgnoredJob(job) {
      return self.ignoredJobs.find(el => el.url === job.url);
    },
    getSearchResults() {
      return self.searchResults.slice();
    }
  }));

export default ResultsStore;
