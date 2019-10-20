import React from "react";
import { Segment, Grid, Accordion, Icon } from "semantic-ui-react";
import ActiveJobs from "./ActiveJobs";
import IgnoredJobs from "./IgnoredJobs";
import OtherJobs from "./OtherJobs";

class CompletedResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ignoredExpanded: false,
      otherExpanded: false
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    if (index === "ignored") {
      this.setState({ ignoredExpanded: !this.state.ignoredExpanded });
    } else {
      this.setState({ otherExpanded: !this.state.otherExpanded });
    }
  };

  render() {
    const { ignoredExpanded, otherExpanded } = this.state;

    let jobsToDisplay = !this.props.company.jobs
      ? null
      : this.props.company.jobs
          .filter(el => !this.props.store.isIgnored(el))
          .map(el =>
            this.props.store.isActive(el)
              ? this.props.store.getActiveJob(el)
              : el
          );

    let jobsToIgnore = !this.props.company.jobs
      ? null
      : this.props.company.jobs.filter(el => this.props.store.isIgnored(el));

    return (
      <Segment>
        <a
          href={this.props.company.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4>{this.props.company.company}</h4>
        </a>
        <div className="activeJobs">
          <ActiveJobs
            store={this.props.store}
            company={this.props.company}
            jobs={jobsToDisplay}
          />
        </div>

        <Accordion>
          <Accordion.Title
            index="ignored"
            active={ignoredExpanded}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Ignored Jobs ({!jobsToIgnore ? 0 : jobsToIgnore.length})
          </Accordion.Title>
          <Accordion.Content active={ignoredExpanded}>
            <IgnoredJobs
              store={this.props.store}
              company={this.props.company}
              jobs={jobsToIgnore}
            />
          </Accordion.Content>
          <Accordion.Title
            index="other"
            active={otherExpanded}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Other Jobs ({!jobsToIgnore ? 0 : jobsToIgnore.length})
          </Accordion.Title>
          <Accordion.Content active={otherExpanded}>
            <OtherJobs
              store={this.props.store}
              company={this.props.company}
              jobs={jobsToIgnore}
            />
          </Accordion.Content>
        </Accordion>
      </Segment>
    );
  }
}

export default CompletedResult;
