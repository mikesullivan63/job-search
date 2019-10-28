//Pass in reference to MobX-State-Tree store to allow for simpler manipultion
function setStore(localStore) {
  this.store = localStore;
}

//Methods to handle storing users while logged in
function storeUser(user, token) {
  this.store.setUser(user, token.token);
  localStorage.setItem("currentUser", JSON.stringify(token));
}

function updateProfile(user) {
  this.store.setUser(user, this.store.getUser().token);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  this.store.logout();
}

function getUser() {
  return this.store.getUser();
}

export const loginService = {
  setStore,
  logout,
  storeUser,
  updateProfile,
  getUser
};
