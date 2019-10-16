exports.objectComparator = fields => {
  return (left, right) => {
    for (let field of fields) {
      if (left[field] > right[field]) {
        return 1;
      }
      if (left[field] < right[field]) {
        return -1;
      }
    }
    return 0;
  };
};
