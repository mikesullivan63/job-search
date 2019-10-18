import { types } from "mobx-state-tree";
//Job model for state management

const User = types.model("User", {
  email: types.string,
  first_name: types.string,
  last_name: types.string
});

export default User;
