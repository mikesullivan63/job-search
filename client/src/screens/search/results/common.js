import { authenticationService } from "../../../services/authentication";

const addJobToList = function(event, data, url, updateCallback) {
  event.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      ...authenticationService.authHeader(),
      ...{ "Content-Type": "application/json" }
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => updateCallback(res))
    .catch(reason => console.log("Error: " + reason));
};

export const commonMethods = {
  addJobToList
};
