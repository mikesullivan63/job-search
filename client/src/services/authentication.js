import { handleResponse } from "./handleResponse";

async function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  let response = await fetch("/user/login", requestOptions);
  const user = await handleResponse.handlePrivateResponse(response);
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem("currentUser", JSON.stringify(user));

  return user;
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
}

function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user;
}

function getCurrentUserProfile() {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      headers: {
        ...authenticationService.authHeader(),
        ...{ "Content-Type": "application/json" }
      }
    };

    let response = fetch("/user/profile", requestOptions)
      .then(response => handleResponse.handlePrivateResponse(response))
      .then(profile => {
        reject(profile);
      })
      .catch(error => {
        console.log("Error loading user profile", error);
        reject(error);
      });
  });
}

function authHeader() {
  // return authorization header with jwt token
  const currentUser = JSON.parse(getCurrentUser());
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
}

export const authenticationService = {
  login,
  logout,
  getCurrentUser,
  getCurrentUserProfile,
  authHeader
};
