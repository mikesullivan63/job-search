import React from "react";
import { Header, Form, Message, Segment, Button } from "semantic-ui-react";
import AbstractForm from "../common/AbstractForm";
import { validationService } from "../../services/validation";
import { profileService } from "../../services/profile";

class UpdateProfileForm extends AbstractForm {
  constructor(props) {
    super(props);

    const user = this.props.store.getUser();

    this.state.fields = [
      {
        name: "email",
        label: "E-mail address",
        icon: "user",
        required: true,
        value: user.email
      },
      {
        name: "firstName",
        label: "First Name",
        required: true,
        value: user.firstName
      },
      {
        name: "lastName",
        label: "Last Names",
        required: true,
        value: user.lastName
      }
    ];
  }

  submitForm = () => {
    return profileService.updateProfile(
      this.getValueForField("email"),
      this.getValueForField("firstName"),
      this.getValueForField("lastName")
    );
  };

  handleSuccess = result => {
    console.log("Profile Updated", JSON.stringify(result, null, 2));
  };

  render() {
    console.log(
      "Rendering UpdateProfileForm section",
      JSON.stringify(this.state, null, 2)
    );
    return this.renderHeaderAndForm(
      "Edit your profile",
      "Update Profile",
      "Profile Updated",
      "Error updating profile"
    );
  }
}

export default UpdateProfileForm;
