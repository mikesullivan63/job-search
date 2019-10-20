//Pass in reference to MobX-State-Tree store to allow for simpler manipultion
let store = null;
function setStore(localStore) {
  this.store = localStore;
}

//Methods to handle storing users while logged in
function storeUser(user, token) {
  this.store.setUser(user, token);
  localStorage.setItem("currentUser", JSON.stringify(token));
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  this.store.logout();
}

export const loginService = {
  setStore,
  logout,
  storeUser
};
