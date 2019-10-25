import React from "react";
import { Accordion, Icon } from "semantic-ui-react";
import JobList from "./JobList";

class CollabsibleJobList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  render() {
    return (
      <Accordion className={this.props.name}>
        <Accordion.Title
          index={this.props.name}
          active={this.state.expanded}
          onClick={event => this.setState({ expanded: !this.state.expanded })}
        >
          <Icon name="dropdown" />
          {this.props.title} ({!this.props.jobs ? 0 : this.props.jobs.length})
        </Accordion.Title>
        <Accordion.Content active={this.state.expanded}>
          <div className="collapsableJobsList">
            <JobList
              store={this.props.store}
              columns={this.props.columns}
              jobs={this.props.jobs}
            >
              {this.props.children}
            </JobList>
          </div>
        </Accordion.Content>
      </Accordion>
    );
  }
}
export default CollabsibleJobList;
