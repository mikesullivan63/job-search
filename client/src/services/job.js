import { authenticationService } from "./authentication";

//Pass in reference to MobX-State-Tree store to allow for simpler manipultion
let store = null;
function setStore(localStore) {
  this.store = localStore;
}
function addJobToList(data, url, updateCallback) {
  fetch(url, {
    method: "POST",
    headers: authenticationService.authHeader({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => updateCallback(res))
    .catch(reason => console.log("Error: " + reason));
}

function ignoreJob(board, url, title, location) {
  addJobToList({ board, url, title, location }, "/job/ignore-job", result =>
    this.store.addIgnoredJob(result.find(el => el.url === url))
  );
}

function watchJob(board, url, title, location) {
  addJobToList({ board, url, title, location }, "/job/add-job", result =>
    this.store.addActiveJob(result.find(el => el.url === url))
  );
}

function archiveJob(jobId) {
  addJobToList({ jobId }, "/job/archive-job", result => {
    this.store.archiveActiveJob(jobId);
  });
}

function watchIgnoredJob(jobId) {
  addJobToList({ jobId }, "/job/watch-ignore-job", result => {
    this.store.addActiveJobFromIgnored(jobId);
  });
}

export const jobService = {
  setStore,
  ignoreJob,
  watchJob,
  archiveJob,
  watchIgnoredJob
};
