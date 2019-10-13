import { types } from "mobx-state-tree";
//Job model for state management

const Job = types.model("Job", {
  title: types.string,
  location: types.string,
  url: types.string
});

export default Job;
