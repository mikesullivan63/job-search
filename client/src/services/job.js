import { authenticationService } from "./authentication";

//Pass in reference to MobX-State-Tree store to allow for simpler manipultion
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

function ignoreJob(board, url, title, location, callback) {
  addJobToList({ board, url, title, location }, "/job/ignore-job", result => {
    this.store.addIgnoredJob(result.find(el => el.url === url));
    callback();
  });
}

function watchJob(board, url, title, location, callback) {
  addJobToList({ board, url, title, location }, "/job/add-job", result => {
    this.store.addActiveJob(result.find(el => el.url === url));
    callback();
  });
}

function ignoreWatchedJob(jobId, callback) {
  addJobToList({ jobId }, "/job/ignore-watched-job", result => {
    this.store.ignoreActiveJob(jobId);
    callback();
  });
}

function watchIgnoredJob(jobId, callback) {
  addJobToList({ jobId }, "/job/watch-ignore-job", result => {
    this.store.addActiveJobFromIgnored(jobId);
    callback();
  });
}

function archiveWatchedJob(jobId, callback) {
  addJobToList({ jobId }, "/job/archive-watched-job", result => {
    this.store.archiveActiveJob(jobId);
    callback();
  });
}
function archiveIgnoredJob(jobId, callback) {
  addJobToList({ jobId }, "/job/archive-ignored-job", result => {
    this.store.archiveIgnoredJob(jobId);
    callback();
  });
}

function getWatchedJobWithStatus(jobId) {
  return new Promise((resolve, reject) => {
    fetch("/job/active-job-status/" + jobId, {
      headers: authenticationService.authHeader({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        console.log("Error: " + error);
        reject(error);
      });
  });
}

function getIgnoredJobWithStatus(jobId) {
  return new Promise((resolve, reject) => {
    fetch("/job/ignored-job-status/" + jobId, {
      headers: authenticationService.authHeader({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        console.log("Error: " + error);
        reject(error);
      });
  });
}

export const jobService = {
  setStore,
  ignoreJob,
  watchJob,
  ignoreWatchedJob,
  watchIgnoredJob,
  archiveWatchedJob,
  archiveIgnoredJob,
  getWatchedJobWithStatus,
  getIgnoredJobWithStatus
};
