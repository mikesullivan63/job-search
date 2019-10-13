import { types, destroy } from "mobx-state-tree";
import Job from "./Job";
import Board from "./Board";
import { comparators } from "./comparators";

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
      self.activeJobs.remove(temp);
      self.ignoredJobs.push(temp);
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
        boards.slice().sort(comparators.boardComparator)
      );
    }
  }))
  .actions(self => ({
    addSearchResult(board) {
      /*
      //Immutable attempt
      let temp = self.searchResults
        .slice()
        .filter(el => el.company !== board.company);
      temp.push(board);
      temp.sort(comparators.boardComparator);
      self.searchResults = temp;
      */
      //Mutable

      console.log(
        "addSearchResult: before update boards: ",
        self.searchResults.length,
        self.searchResults[0].company,
        self.searchResults[self.searchResults.length - 1].company
      );

      let loc = self.searchResults.findIndex(
        el => el.company === board.company
      );
      let temp = self.searchResults[loc];

      console.log(
        "addSearchResult: middle: ",
        loc,
        temp.company,
        board.company
      );

      self.searchResults[loc] = board;

      destroy(temp);
      console.log(
        "addSearchResult: after update boards: ",
        self.searchResults.length,
        self.searchResults[0].company,
        self.searchResults[self.searchResults.length - 1].company
      );
    }
  }))
  .views(self => ({
    isIgnored(job) {
      return self.ignoredJobs.some(el => el.url === job.url);
    },
    isActive(job) {
      return self.activeJobs.some(el => el.url === job.url);
    },
    getSearchResults() {
      return self.searchResults.slice();
    }
  }));

export default ResultsStore;
