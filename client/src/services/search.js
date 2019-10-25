import { authenticationService } from "./authentication";

//Pass in reference to MobX-State-Tree store to allow for simpler manipultion
let store = null;
function setStore(localStore) {
  this.store = localStore;
}

function loadCompanies() {
  fetch("/api/companies")
    .then(res => res.json())
    .then(data => {
      this.store.setSearchResults(
        data.companies.map(company => ({
          company: company.name,
          jobs: []
        }))
      );
    })
    .catch(error => console.log("Error loading boards: ", error));
}

function loadLastSearch() {
  return new Promise((resolve, reject) => {
    fetch("/user/last-search", {
      headers: authenticationService.authHeader()
    })
      .then(res => res.json())
      .then(res =>
        resolve({
          title: res.title,
          location: res.location
        })
      )
      .catch(error => {
        console.log("Error loading previous results: ", error);
        reject(error);
      });
  });
}

function updateStateWithFetch(url, response) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: authenticationService.authHeader()
    })
      .then(res => res.json())
      .then(res => resolve(response(res)))
      .catch(error => {
        console.log("Received error updating field from ", url, error);
        reject(error);
      });
  });
}

function setActiveJobs(store) {
  return updateStateWithFetch("/job/active-jobs", res => {
    store.setActiveJobs(res);
    return res;
  });
}
function setIgnoredJobs(store) {
  return updateStateWithFetch("/job/ignored-jobs", res => {
    store.setIgnoredJobs(res);
    return res;
  });
}

function postSearchCall(title, location) {
  return new Promise((resolve, reject) => {
    //Post for history
    fetch("/user/search", {
      method: "POST",
      headers: authenticationService.authHeader({
        "Content-Type": "application/json"
      }),

      body: JSON.stringify({ title, location })
    })
      .then(res => resolve(res))
      .catch(error => {
        console.log("Error sending search history over");
        reject(error);
      });
  });
}

function processBoard(board, title, location, store) {
  store.addSearchResult({
    company: board.company,
    url: board.url,
    status: "PENDING",
    jobs: []
  });
  title = title || " ";
  location = location || " ";

  fetch("/api/" + board.company + "/" + title + "/" + location)
    .then(res => res.json())
    .then(result => store.addSearchResult(result))
    .catch(error => {
      console.log("Error processing board", board.company, error);
    });
}

function executeSearch(title, location) {
  //Refresh job lists
  Promise.all([
    setActiveJobs(this.store),
    setIgnoredJobs(this.store),
    postSearchCall(title, location)
  ])
    .then(
      this.store
        .getSearchResults()
        .forEach(board =>
          processBoard(board.toJSON(), title, location, this.store)
        )
    )
    .catch(error => console.log("Errors", JSON.stringify(error, null, 2)));
}

export const searchService = {
  setStore,
  loadCompanies,
  loadLastSearch,
  executeSearch
};
