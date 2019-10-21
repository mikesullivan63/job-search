import { loginService } from "./login";
import { handleResponse } from "./handleResponse";

function login(email, password) {
  return new Promise((resolve, reject) => {
    fetch("/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(response => handleResponse.handlePrivateResponse(response))
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
        console.log("Error logging user in", error);
        loginService.logout();
        reject(error);
      });
  });
}

function remember() {
  const persistentToken = localStorage.getItem("currentUser");
  if (persistentToken && JSON.parse(persistentToken).token) {
    fetch("/user/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(persistentToken).token}`
      }
    })
      .then(response => handleResponse.handlePrivateResponse(response))
      .then(profile => {
        loginService.storeUser(profile, JSON.parse(persistentToken));
      })
      .catch(error => {
        console.log("Error loading user profile", error);
        loginService.logout();
      });
  } else {
    loginService.logout();
  }
}

function authHeader() {
  // return authorization header with jwt token
  const currentUser = loginService.getUser();
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
}

export const authenticationService = {
  login,
  remember,
  authHeader
};
