import React from "react";
import { Segment } from "semantic-ui-react";
import { Button, Icon } from "semantic-ui-react";
import { searchService } from "../../../../services/search";

const CommonSegment = props => (
  <Segment className={props.className} {...props.style}>
    {!!props.redo && (
      <Button
        floated="right"
        onClick={event => {
          event.preventDefault();
          searchService.processBoard(
            props.store
              .getSearchResults()
              .find(board => board.company === props.company.company)
              .toJSON(),
            props.store.getLastSearch().title,
            props.store.getLastSearch().location,
            props.store
          );
        }}
      >
        <Icon name="redo"></Icon>
      </Button>
    )}
    <a href={props.company.url} target="_blank" rel="noopener noreferrer">
      <h4>{props.company.company}</h4>
    </a>
    {props.children}
  </Segment>
);

export default CommonSegment;
