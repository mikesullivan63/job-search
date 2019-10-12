import { authenticationService } from "./services/authentication";

/*
function getProfile() {
  const requestOptions = {
    method: "GET",
    headers: {
      ...authenticationService.authHeader(),
      ...{ "Content-Type": "application/json" }
    },
    body: ""
  };

  return fetch(`/user/profile`, requestOptions)
    .then(handleResponse)
    .then(profile => {
      return profile;
    });
}
*/

export const profileService = {
  getProfile
};
