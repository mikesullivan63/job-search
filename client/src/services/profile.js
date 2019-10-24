import { authenticationService } from "./authentication";
import { handleResponse } from "./handleResponse";
import { loginService } from "./login";

function updateCall(url, data, success, failure) {
  return new Promise(function(resolve, reject) {
    fetch(url, {
      method: "POST",
      headers: authenticationService.authHeader({
        "Content-Type": "application/json"
      }),

      body: JSON.stringify(data)
    })
      .then(handleResponse.handlePrivateResponse)
      .then(result => {
        resolve(success(result));
      })
      .catch(error => {
        failure(error);
        return reject(error);
      });
  });
}

function register(email, firstName, lastName, password, confirm) {
  return updateCall(
    "/user/register",
    { email, firstName, lastName, password, confirm },
    token => {
      fetch("/user/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`
        }
      })
        .then(handleResponse.handlePrivateResponse)
        .then(profile => {
          loginService.storeUser(profile, token);
          return token;
        })
        .catch(error => {
          console.log("Error loading user profile", error);
          loginService.logout();
          throw error;
        });
    },
    error => {}
  );
}

function updateProfile(email, firstName, lastName) {
  return updateCall(
    "/user/updateProfile",
    { email, firstName, lastName },
    profile => {
      loginService.updateProfile(profile);
      return "SUCCESS";
    },
    error => {}
  );
}

function updatePassword(oldPassword, password, confirm) {
  return updateCall(
    "/user/updatePassword",
    { oldPassword, password, confirm },
    profile => {
      return "SUCCESS";
    },
    error => {}
  );
}

export const profileService = {
  updateProfile,
  updatePassword,
  register
};
