import { handleResponse } from "./handleResponse";

function isValidPassword(password) {
  return (
    /[a-z]/.exec(password) &&
    /[A-Z]/.exec(password) &&
    /[1-9]/.exec(password) &&
    /[$^!%#@&*()-_]/.exec(password)
  );
}

function register(email, firstName, lastName, password, confirm) {
  return new Promise(function(resolve, reject) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, firstName, lastName, password })
    };

    let errors = [];

    if (confirm !== password) {
      errors.push("Passwords do not match");
    }

    if (password.length < 8 || password.length > 64) {
      errors.push("Passwords must be between 8 and 64 characters");
    }

    if (!isValidPassword(password)) {
      errors.push(
        "Passwords must contain a lower case letter, an upper case letter, a number and a symbol"
      );
    }

    if (errors.length > 0) {
      return reject(errors);
    }

    fetch("/user/register", requestOptions)
      .then(handleResponse.handleRegistrationResponse)
      .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("currentUser", JSON.stringify(user));
        return resolve(user);
      })
      .catch(error => {
        return reject(error);
      });
  });
}

export const registrationService = {
  register
};
