//Job model for state management

const Job = types.model("Job", {
  title: types.string,
  location: types.string,
  url: types.string
});

Job.methods.comparator = function(left, right) {
  if (left.company > right.company) {
    return 1;
  }
  if (left.company < right.company) {
    return -1;
  }
  return 0;
};

export default Job;
