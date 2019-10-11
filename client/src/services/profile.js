import { authHeader } from "./services/authentication";

function getProfile() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    headers: { "Content-Type": "application/json" },
    body: ""
  };

  return fetch(`/user/profile`, requestOptions)
    .then(handleResponse)
    .then(profile => {
      return profile;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
}

export const profileService = {
  getProfile
};
