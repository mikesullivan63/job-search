import { types } from "mobx-state-tree";
import Job from "./Job";

const Board = types
  .model("Board", {
    company: types.string,
    url: types.string,
    status: types.string,
    error: types.string,
    jobs: types.array(Job),
    otherJobs: types.array(Job)
  })
  .actions(self => ({
    setJobs(jobs, otherJobs) {
      self.status = "COMPLETE";
      self.jobs = jobs;
      self.otherJobs = otherJobs;
      self.error = null;
    }
  }))
  .actions(self => ({
    setPending() {
      self.status = "PENDING";
      self.jobs = [];
      self.error = null;
    }
  }))
  .actions(self => ({
    setError(error) {
      self.status = "ERROR";
      self.jobs = [];
      self.error = error;
    }
  }));

export default Board;
