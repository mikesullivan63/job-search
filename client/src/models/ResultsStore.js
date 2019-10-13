import { types } from "mobx-state-tree";
import { Job } from "./Job";
import { Board } from "./Board";

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
    setIgnoredJobs(jobs) {
      self.ignoredJobs = jobs;
    }
  }))
  .actions(self => ({
    setSearchResults(boards) {
      self.searchResults = boards.slice().sort(Board.comparator);
    }
  }))
  .actions(self => ({
    addSearchResult(board) {
      self.searchResults = boards
        .slice()
        .filter(el => el.company !== board.company)
        .push(board)
        .sort(Board.comparator);
    }
  }))
  .views(self => ({
    isIgnored(job) {
      return self.ignoredJobs.some(el => el.url === job.url);
    }
  }))
  .views(self => ({
    isActive(job) {
      return self.activeJobs.some(el => el.url === job.url);
    }
  }));

export default ResultsStore;
