import { types, detach, destroy } from "mobx-state-tree";
import Job from "./Job";
import Board from "./Board";
import User from "./User";
import { objectComparator } from "../util/comparator";

const ResultsStore = types
  .model("ResultsStore", {
    user: types.optional(User, {}),
    loggedIn: types.optional(types.boolean, false),
    activeJobs: types.array(Job),
    ignoredJobs: types.array(Job),
    searchResults: types.array(Board)
  })
  .actions(self => ({
    setActiveJobs(jobs) {
      self.activeJobs = jobs;
    },
    addActiveJob(job) {
      self.activeJobs.push(job);
    },
    addActiveJobFromIgnored(jobId) {
      let temp = self.ignoredJobs.find(el => el._id === jobId);
      self.activeJobs.push(detach(temp));
    },
    ignoreActiveJob(jobId) {
      let temp = self.activeJobs.find(el => el._id === jobId);
      self.ignoredJobs.push(detach(temp));
    },
    archiveActiveJob(jobId) {
      let temp = self.activeJobs.find(el => el._id === jobId);
      self.activeJobs.remove(detach(temp));
    }
  }))
  .actions(self => ({
    setIgnoredJobs(jobs) {
      self.ignoredJobs = jobs;
    },
    addIgnoredJob(job) {
      self.ignoredJobs.push(job);
    },
    archiveIgnoredJob(jobId) {
      let temp = self.activeJobs.find(el => el._id === jobId);
      self.ignoredJobs.remove(detach(temp));
    }
  }))
  .actions(self => ({
    setSearchResults(boards) {
      self.searchResults.replace(
        boards.slice().sort(objectComparator("company"))
      );
    },
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
  .actions(self => ({
    setUser(user, token) {
      user.token = token;
      self.user = user;
      self.loggedIn = true;
    },
    logout() {
      self.loggedIn = false;
      destroy(self.user);
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
    getActiveJobs() {
      return self.activeJobs.slice();
    },
    getIgnoredJob(job) {
      return self.ignoredJobs.find(el => el.url === job.url);
    },
    getIgnoredJobs() {
      return self.ignoredJobs.slice();
    },
    getSearchResults() {
      return self.searchResults.slice();
    },
    getUser() {
      return self.user;
    },
    isLoggedIn() {
      return self.loggedIn;
    }
  }));

export default ResultsStore;
