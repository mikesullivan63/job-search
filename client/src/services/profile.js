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
      .then(profile => {
        success(profile);
        resolve("SUCCESS");
      })
      .catch(error => {
        failure(error);
        return reject(error);
      });
  });
}

function updateProfile(email, firstName, lastName) {
  return updateCall(
    "/user/updateProfile",
    { email, firstName, lastName },
    profile => loginService.updateProfile(profile),
    error => {}
  );
}

function updatePassword(oldPassword, password, confirm) {
  return updateCall(
    "/user/updatePassword",
    { oldPassword, password, confirm },
    profile => {},
    error => {}
  );
}

export const profileService = {
  updateProfile,
  updatePassword
};
