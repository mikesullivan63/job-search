import React from "react";
import ProfileForm from "../common/ProfileForm";
import { profileService } from "../../services/profile";

const UpdateProfileForm = props => {
  const user = props.store.getUser();
  const fields = profileService.PROFILE_FIELDS;
  fields.forEach(field => (field.value = user[field.name]));

  return (
    <ProfileForm
      name="profile"
      title="Edit your profile"
      buttonLabel="Update Profile"
      successMessage="Profile Updated"
      errorMessage="Error updating profile"
      fields={fields}
      submitForm={data => profileService.updateProfile(data)}
      handleSuccess={() => console.log("Profile Updated")}
    />
  );
};

export default UpdateProfileForm;
