import React from "react";
//import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { mount, renderer } from "enzyme";
import Result from "../../screens/search/results/Result";
import ResultsStore from "../../models/ResultsStore";
import { jobService } from "../../services/job";
import { loginService } from "../../services/login";

//semaphoreci.com/community/tutorials/how-to-test-react-and-mobx-with-jest

describe("Result Display tests", () => {
  Enzyme.configure({ adapter: new Adapter() });

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
          },
          {
            _id: "",
            title: "Job Title GHI123",
            location: "San Francisco",
            url: "https://www.example.com/job/GHI123"
          },
          {
            _id: "",
            title: "Job Title JKL123",
            location: "San Francisco",
            url: "https://www.example.com/job/JKL123"
          }
        ],
        otherJobs: [
          {
            _id: "",
            title: "Job Title MNO123",
            location: "San Francisco",
            url: "https://www.example.com/job/MNO123"
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

    loginService.setStore(store);
    jobService.setStore(store);
    return store;
  };

  test("Render result for pending result", () => {
    const store = buildStore();
    const company = store.searchResults.find(el => el.status === "PENDING");

    const component = mount(
      <Result store={store} key={company.company} company={company} />
    );

    expect(component).toMatchSnapshot();
  });

  test("Render result for error result", () => {
    const store = buildStore();
    const company = store.searchResults.find(el => el.status === "ERROR");

    const component = mount(
      <Result store={store} key={company.company} company={company} />
    );

    expect(component).toMatchSnapshot();
  });

  test("Render result for completed results", done => {
    const store = buildStore();
    const company = store.searchResults.find(el => el.status === "COMPLETED");
    const component = mount(
      <Result store={store} key={company.company} company={company} />
    );
    expect(component.find("div.activeJobs a").length).toBe(3); //3 'Active' jobs
    expect(component.find("div.ignoredJobs a").length).toBe(1); //1 'Ignored' job
    expect(component.find("div.otherJobs a").length).toBe(1); //1 'Other' job

    expect(component.find("button.archiveButton").length).toBe(1);
    expect(component.find("button.watchButton").length).toBe(2);
    expect(component.find("button.ignoreButton").length).toBe(2);
    expect(component.find("button.watchIgnoredButton").length).toBe(1);

    expect(component).toMatchSnapshot();
    done();
  });

  test("Render result for good results, archive one of them", done => {
    jest.restoreAllMocks();
    jest.spyOn(global, "fetch").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(new Response('"OK"'));
      });
    });

    const store = buildStore();
    const company = store.searchResults.find(el => el.status === "COMPLETED");
    const component = mount(
      <Result store={store} key={company.company} company={company} />
    );
    expect(store.activeJobs.length).toBe(2);
    expect(store.ignoredJobs.length).toBe(2);

    expect(component.find("div.completedResult").length).toBe(1);
    expect(component.find("div.activeJobs a").length).toBe(3); //3 'Active' jobs
    expect(component.find("div.ignoredJobs a").length).toBe(1); //1 'Ignored' job
    expect(component.find("div.otherJobs a").length).toBe(1); //1 'Other' job

    expect(component.find("button.archiveButton").length).toBe(1);
    component.find("button.archiveButton").simulate("click");

    setTimeout(() => {
      component.update();

      expect(store.activeJobs.length).toBe(1);
      expect(store.ignoredJobs.length).toBe(3);
      expect(component.find("button.archiveButton").length).toBe(0);
      expect(component.find("div.activeJobs a").length).toBe(2); //2 'Active' jobs remaining
      expect(component.find("div.ignoredJobs a").length).toBe(2); //2 'Ignored' job, as we just added 0ne
      expect(component.find("div.otherJobs a").length).toBe(1); //1 'Other' job, unchanged

      expect(component).toMatchSnapshot();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        "/job/archive-job",
        expect.anything()
      );
      global.fetch.mockClear();

      done();
    });
  });

  test("Render result for good results, watch one", done => {
    jest.restoreAllMocks();

    const store = buildStore();
    const company = store.searchResults.find(el => el.status === "COMPLETED");
    const component = mount(
      <Result store={store} key={company.company} company={company} />
    );
    expect(store.activeJobs.length).toBe(2);
    expect(store.ignoredJobs.length).toBe(2);

    jest.spyOn(global, "fetch").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(
          new Response(
            JSON.stringify([
              {
                _id: "GHI123",
                title: "Job Title GHI123",
                location: "San Francisco",
                url: "https://www.example.com/job/GHI123"
              }
            ])
          )
        );
      });
    });

    component
      .find("button.watchButton")
      .first()
      .simulate("click");

    setTimeout(() => {
      component.update();
      expect(store.activeJobs.length).toBe(3);
      expect(store.ignoredJobs.length).toBe(2);

      expect(component.find("button.archiveButton").length).toBe(2);
      expect(component.find("button.watchButton").length).toBe(1);

      expect(component.find("div.activeJobs a").length).toBe(3); //3 'Active' jobs
      expect(component.find("div.ignoredJobs a").length).toBe(1); //1 'Ignored' job
      expect(component.find("div.otherJobs a").length).toBe(1); //1 'Other' job

      expect(component).toMatchSnapshot();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        "/job/add-job",
        expect.anything()
      );
      global.fetch.mockClear();

      done();
    });
  });

  test("Render result for good results, ignore one", done => {
    jest.restoreAllMocks();

    const store = buildStore();
    const company = store.searchResults.find(el => el.status === "COMPLETED");
    const component = mount(
      <Result store={store} key={company.company} company={company} />
    );
    expect(store.activeJobs.length).toBe(2);
    expect(store.ignoredJobs.length).toBe(2);

    jest.spyOn(global, "fetch").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(
          new Response(
            JSON.stringify([
              {
                _id: "JKL123",
                title: "Job Title JKL123",
                location: "San Francisco",
                url: "https://www.example.com/job/JKL123"
              }
            ])
          )
        );
      });
    });

    component
      .find("button.ignoreButton")
      .last()
      .simulate("click");

    setTimeout(() => {
      component.update();

      expect(store.activeJobs.length).toBe(2);
      expect(store.ignoredJobs.length).toBe(3);
      expect(component.find("button.archiveButton").length).toBe(1);
      expect(component.find("button.watchButton").length).toBe(1);

      expect(component.find("div.activeJobs a").length).toBe(2); //2 'Active' jobs, we ignored one
      expect(component.find("div.ignoredJobs a").length).toBe(2); //2 'Ignored' jobs, we ignored one
      expect(component.find("div.otherJobs a").length).toBe(1); //1 'Other' job

      expect(component).toMatchSnapshot();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        "/job/ignore-job",
        expect.anything()
      );
      global.fetch.mockClear();

      done();
    });
  });
});
