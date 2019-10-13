import { types } from "mobx-state-tree";
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
    setIgnoredJobs(jobs) {
      self.ignoredJobs = jobs;
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
      let loc = self.searchResults.findIndex(
        el => el.company !== board.company
      );
      self.searchResults[loc] = board;
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
