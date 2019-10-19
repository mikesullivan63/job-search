import { handleResponse } from "./handleResponse";

//Pass in reference to MobX-State-Tree store to allow for simpler manipultion
let store = null;
function setStore(localStore) {
  this.store = localStore;
}

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
            this.store.setUser(profile, token);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(token));
            resolve(token);
          })
          .catch(error => {
            console.log("Error loading user profile", error);
            authenticationService.logout();
            reject(error);
          });
      })
      .catch(error => {
        console.log("Error logging user in", error);
        authenticationService.logout();
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
        this.store.setUser(profile, JSON.parse(persistentToken));
      })
      .catch(error => {
        console.log("Error loading user profile", error);
        authenticationService.logout();
      });
  } else {
    authenticationService.logout();
  }
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  this.store.logout();
}

function authHeader() {
  // return authorization header with jwt token
  const currentUser = this.store.getUser();
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
}

export const authenticationService = {
  setStore,
  login,
  logout,
  remember,
  authHeader
};
