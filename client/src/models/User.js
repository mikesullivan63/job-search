import { types } from "mobx-state-tree";
//Job model for state management

const User = types.model("User", {
  email: types.optional(types.string, ""),
  firstName: types.optional(types.string, ""),
  lastName: types.optional(types.string, ""),
  token: types.optional(types.string, "")
});

export default User;
