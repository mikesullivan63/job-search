//Pass in reference to MobX-State-Tree store to allow for simpler manipultion
let store = null;
function setStore(localStore) {
  this.store = localStore;
}

//Methods to handle storing users while logged in
function storeUser(user, token) {
  console.log("Storing user: ", JSON.stringify(user, null, 2));
  this.store.setUser(user, token);
  localStorage.setItem("currentUser", JSON.stringify(token));
}

function updateProfile(user, token) {
  console.log("Updating user: ", JSON.stringify(user, null, 2));
  this.store.setUser(user, this.store.getUser().token);
}

function logout() {
  console.log("Removing user ", JSON.stringify(this.store.getUser(), null, 2));
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  this.store.logout();
}

function getUser() {
  console.log(
    "Returning user: ",
    JSON.stringify(this.store.getUser(), null, 2)
  );
  return this.store.getUser();
}

export const loginService = {
  setStore,
  logout,
  storeUser,
  updateProfile,
  getUser
};
