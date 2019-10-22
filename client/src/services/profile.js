import { authenticationService } from "./authentication";
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
    console.log(
      "Submitting password update with ",
      oldPassword,
      password,
      confirm
    );
    let errors = [];

    if (confirm !== password) {
      errors.push("Passwords do not match");
    }

    errors = errors
      .concat(
        profileValidationService.requiredValueCheck(
          oldPassword,
          "Current Password"
        )
      )
      .concat(
        profileValidationService.requiredValueCheck(password, "New Password")
      )
      .concat(profileValidationService.isValidPassword(password))
      .concat(
        profileValidationService.requiredValueCheck(confirm, "Confirm Password")
      );

    if (errors.length > 0) {
      console.log("Rejecting password with ", JSON.stringify(errors, null, 2));
      return reject(errors);
    }

    console.log("Fetching password with ", JSON.stringify(errors, null, 2));

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
