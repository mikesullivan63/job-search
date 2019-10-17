import React from "react";
import renderer from "react-test-renderer";
import Result from "../../screens/search/Result";
import ResultsStore from "../../models/ResultsStore";

//semaphoreci.com/community/tutorials/how-to-test-react-and-mobx-with-jest

describe("Result Display tests", () => {
  const buildStore = () => {
    const store = ResultsStore.create({});
    store.setActiveJobs([
      {
        _id: "ABC123",
        title: "Job Title ABC123",
        location: "San Francisco",
        url: "https://www.example.com/job/ABC123"
      },
      {
        _id: "ABC456",
        title: "Job Title ABC456",
        location: "San Francisco",
        url: "https://www.example.org/job/ABC456"
      }
    ]);

    store.setIgnoredJobs([
      {
        _id: "DEF123",
        title: "Job Title DEF123",
        location: "San Francisco",
        url: "https://www.example.com/job/DEF123"
      },
      {
        _id: "DEF456",
        title: "Job Title DEF456",
        location: "San Francisco",
        url: "https://www.example.org/job/DEF456"
      }
    ]);

    store.setSearchResults([
      {
        company: "Example.com",
        url: "https://www.example.com/job/",
        status: "COMPLETED",
        error: "",
        jobs: [
          {
            _id: "ABC123",
            title: "Job Title ABC123",
            location: "San Francisco",
            url: "https://www.example.com/job/ABC123"
          },
          {
            _id: "DEF123",
            title: "Job Title DEF123",
            location: "San Francisco",
            url: "https://www.example.com/job/DEF123"
          }
        ]
      },
      {
        company: "Example.org",
        url: "https://www.example.org/job/",
        status: "COMPLETED",
        error: "",
        jobs: [
          {
            _id: "ABC456",
            title: "Job Title ABC456",
            location: "San Francisco",
            url: "https://www.example.org/job/ABC456"
          },
          {
            _id: "DEF456",
            title: "Job Title DEF456",
            location: "San Francisco",
            url: "https://www.example.org/job/DEF456"
          }
        ]
      },
      {
        company: "Example.io",
        url: "https://www.example.io/job/",
        status: "PENDING",
        error: ""
      },
      {
        company: "Error.com",
        url: "https://www.error.com/job/",
        status: "ERROR",
        error: "Problem accessing page"
      }
    ]);

    return store;
  };

  test("Render result for pending result", () => {
    const store = buildStore();
    const company = store.searchResults.find(el => el.status === "PENDING");

    const component = renderer.create(
      <Result store={store} key={company.company} company={company} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Render result for error result", () => {
    const store = buildStore();
    const company = store.searchResults.find(el => el.status === "ERROR");

    const component = renderer.create(
      <Result store={store} key={company.company} company={company} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Render result for good results", () => {
    const store = buildStore();
    store.searchResults
      .filter(el => el.status === "COMPLETED")
      .forEach(company => {
        const component = renderer.create(
          <Result store={store} key={company.company} company={company} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
  });
});
