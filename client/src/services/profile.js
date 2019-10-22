import { profileValidationService } from "./profileValidation";
import { handleResponse } from "./handleResponse";
import { loginService } from "./login";

function updateProfile(email, firstName, lastName) {
  return new Promise(function(resolve, reject) {
    let errors = [];

    errors = errors.concat(
      profileValidationService.areProfileValuesValid(email, firstName, lastName)
    );

    if (errors.length > 0) {
      return reject(errors);
    }

    fetch("/user/updateProfile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    let errors = [];

    if (confirm !== password) {
      errors.push("Passwords do not match");
    }

    errors = errors.concat(profileValidationService(password));

    if (errors.length > 0) {
      return reject(errors);
    }

    fetch("/user/updatePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, password, confirm })
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

export const profileService = {
  updateProfile,
  updatePassword
};
