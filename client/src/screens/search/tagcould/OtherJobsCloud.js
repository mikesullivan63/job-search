import React from "react";
import { observer } from "mobx-react";
import { Segment, Header } from "semantic-ui-react";
import { TagCloud } from "react-tagcloud";

function processJobData(boards, getJobs, getField) {
  return Array.from(
    boards
      .reduce((results, board) => {
        getJobs(board)
          .flatMap(job =>
            getField(job)
              .trim()
              .toLowerCase()
              .replace(/(())/g, "")
              .split(" ")
          )
          .forEach(word => {
            results.set(word, 1 + (results.has(word) ? results.get(word) : 0));
          });
        return results;
      }, new Map())
      .entries(),
    ([key, value]) => {
      return { value: key, count: value };
    }
  )
    .sort((left, right) => right.count - left.count)
    .slice(0, 100);
}

const OtherJobsCloud = props => {
  const titleWordSet = processJobData(
    props.store.searchResults,
    board => board.otherJobs,
    job => job.title
  );
  const locationWordSet = processJobData(
    props.store.searchResults,
    board => board.otherJobs,
    job => job.location
  );

  return (
    <React.Fragment>
      {titleWordSet.length > 0 && (
        <Segment>
          <Header as="h4">Other Jobs Titles</Header>
          <TagCloud minSize={12} maxSize={50} tags={titleWordSet} />
        </Segment>
      )}
      {locationWordSet.length > 0 && (
        <Segment>
          <Header as="h4">Other Jobs Locations</Header>
          <TagCloud minSize={12} maxSize={50} tags={locationWordSet} />
        </Segment>
      )}
    </React.Fragment>
  );
  /*

*/
};

export default observer(OtherJobsCloud);
