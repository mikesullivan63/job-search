import React from "react";
import ProfileForm from "../common/ProfileForm";
import { profileService } from "../../services/profile";

const UpdatePasswordForm = props => {
  const fields = [
    {
      name: "oldPassword",
      label: "Current Password",
      icon: "lock",
      type: "password",
      required: true
    }
  ].concat(profileService.PASSWORD_FIELDS);

  return (
    <ProfileForm
      name="password"
      title="Change your password"
      buttonLabel="Update Password"
      successMessage="Password Updated"
      errorMessage="Error updating password"
      fields={fields}
      submitForm={data => profileService.updatePassword(data)}
      handleSuccess={() => console.log("Password Updated")}
      clearOnSuccess={true}
    />
  );
};
export default UpdatePasswordForm;
