import { handleResponse } from "./handleResponse";
import { profileValidationService } from "./validation";
import { loginService } from "./login";

function register(email, firstName, lastName, password, confirm) {
  return new Promise(function(resolve, reject) {
    let errors = [];

    if (confirm !== password) {
      errors.push("Passwords do not match");
    }

    errors = errors.concat(
      profileValidationService.areProfileValuesValid(email, firstName, lastName)
    );
    errors = errors.concat(profileValidationService.isValidPassword(password));

    if (errors.length > 0) {
      return reject(errors);
    }

    fetch("/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, firstName, lastName, password, confirm })
    })
      .then(handleResponse.handleRegistrationResponse)
      .then(token => {
        fetch("/user/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`
          }
        })
          .then(response => handleResponse.handlePrivateResponse(response))
          .then(profile => {
            loginService.storeUser(profile, token);
            resolve(token);
          })
          .catch(error => {
            console.log("Error loading user profile", error);
            loginService.logout();
            reject(error);
          });
      })
      .catch(error => {
        return reject(error);
      });
  });
}

export const registrationService = {
  register
};
