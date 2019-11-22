import React from "react";
import { observer } from "mobx-react";
import { Segment, Header } from "semantic-ui-react";
import { TagCloud } from "react-tagcloud";

function processJobData(boards, getJobs, getField, searchTerms) {
  const searchTermIndex = searchTerms
    .toLowerCase()
    .split(" or ")
    .map(term => term.trim());

  //Convert boards to cleaned up job terms
  const allFieldTerms = boards
    .flatMap(board => getJobs(board))
    .map(job =>
      getField(job)
        .trim()
        .toLowerCase()
        .replace(/([(),-])/g, "")
    );

  console.log(
    "All terms - searchTermIndex:",
    searchTermIndex.length,
    JSON.stringify(searchTermIndex, null, 2)
  );

  console.log(
    "All terms - pre filter:",
    allFieldTerms.length,
    JSON.stringify(allFieldTerms, null, 2)
  );

  //Remove terms that match search
  const filteredTerms = allFieldTerms.filter(
    terms => !searchTermIndex.some(exclude => terms.indexOf(exclude) > -1)
  );

  console.log(
    "All terms - post filter:",
    filteredTerms.length,
    JSON.stringify(filteredTerms, null, 2)
  );

  //Convert to single words
  const words = filteredTerms.flatMap(terms =>
    terms
      .split(" ")
      .map(term => term.trim())
      .filter(term => term != "")
  );

  //Generate map of word counts
  const wordCounts = words.reduce((updatedResult, word) => {
    updatedResult.set(
      word,
      1 + (updatedResult.has(word) ? updatedResult.get(word) : 0)
    );
    return updatedResult;
  }, new Map());

  //Convert map to an array of terms and counts
  const result = Array.from(wordCounts.entries(), ([key, value]) => {
    return { value: key, count: value };
  })
    .sort((left, right) => right.count - left.count)
    .slice(0, 100);

  console.log(
    "All terms - results:",
    result.length,
    JSON.stringify(result, null, 2)
  );
  return result;
}

const OtherJobsCloud = props => {
  const titleWordSet = processJobData(
    props.store.searchResults,
    board => board.otherJobs,
    job => job.title,
    props.store.lastSearch.title
  );
  const locationWordSet = processJobData(
    props.store.searchResults,
    board => board.otherJobs,
    job => job.location,
    props.store.lastSearch.location
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
