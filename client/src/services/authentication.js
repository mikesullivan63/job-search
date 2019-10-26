import { loginService } from "./login";
import { handleResponse } from "./handleResponse";

function login(data) {
  return new Promise((resolve, reject) => {
    fetch("/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
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
  return new Promise((resolve, reject) => {
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
          return resolve(profile);
        })
        .catch(error => {
          console.log("Error loading user profile", error);
          loginService.logout();
          return reject(error);
        });
    } else {
      loginService.logout();
      return resolve(null);
    }
  });
}

function authHeader(otherHeaders) {
  // return authorization header with jwt token
  const currentUser = loginService.getUser();
  if (currentUser && currentUser.token) {
    return {
      ...otherHeaders,
      ...{ Authorization: `Bearer ${currentUser.token}` }
    };
  } else {
    return otherHeaders;
  }
}

export const authenticationService = {
  login,
  remember,
  authHeader
};
