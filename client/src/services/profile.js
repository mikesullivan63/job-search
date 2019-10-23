import { authenticationService } from "./authentication";
import { profileValidationService } from "./profileValidation";
import { handleResponse } from "./handleResponse";
import { loginService } from "./login";

function updateProfile(email, firstName, lastName) {
  return new Promise(function(resolve, reject) {
    fetch("/user/updateProfile", {
      method: "POST",
      headers: {
        ...authenticationService.authHeader(),
        ...{ "Content-Type": "application/json" }
      },
      body: JSON.stringify({ email, firstName, lastName })
    })
      .then(handleResponse.handlePrivateResponse)
      .then(profile => {
        loginService.updateProfile(profile);
        resolve("SUCCESS");
      })
      .catch(error => {
        return reject(error);
      });
  });
}

function updatePassword(oldPassword, password, confirm) {
  return new Promise(function(resolve, reject) {
    fetch("/user/updatePassword", {
      method: "POST",
      headers: {
        ...authenticationService.authHeader(),
        ...{ "Content-Type": "application/json" }
      },
      body: JSON.stringify({ oldPassword, password, confirm })
    })
      .then(handleResponse.handlePrivateResponse)
      .then(profile => {
        console.log("Updated password");
        resolve("SUCCESS");
      })
      .catch(error => {
        console.log("Errored password with ", JSON.stringify(error, null, 2));
        return reject(error);
      });
  });
}

export const profileService = {
  updateProfile,
  updatePassword
};
