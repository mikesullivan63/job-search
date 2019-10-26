import { authenticationService } from "./authentication";
import { handleResponse } from "./handleResponse";
import { loginService } from "./login";

const PROFILE_FIELDS = [
  {
    name: "email",
    label: "E-mail address",
    icon: "user",
    required: true
  },
  {
    name: "firstName",
    label: "First Name",
    required: true
  },
  {
    name: "lastName",
    label: "Last Names",
    required: true
  }
];

const PASSWORD_FIELDS = [
  {
    name: "password",
    label: "Password",
    icon: "lock",
    type: "password",
    required: true
  },
  {
    name: "confirm",
    label: "Confirm Password",
    icon: "lock",
    type: "password",
    required: true
  }
];

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

function register(data) {
  return updateCall(
    "/user/register",
    data,
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
  PROFILE_FIELDS,
  PASSWORD_FIELDS,
  updateProfile,
  updatePassword,
  register
};
