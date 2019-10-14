function jobComparator(left, right) {
  if (left.company > right.company) {
    return 1;
  }
  if (left.company < right.company) {
    return -1;
  }
  return 0;
}

function boardComparator(left, right) {
  if (left.company > right.company) {
    return 1;
  }
  if (left.company < right.company) {
    return -1;
  }
  return 0;
}

export const comparators = {
  jobComparator,
  boardComparator
};
