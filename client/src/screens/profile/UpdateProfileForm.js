import AbstractForm from "../common/AbstractForm";
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
    return this.renderHeaderAndForm(
      "profile",
      "Edit your profile",
      "Update Profile",
      "Profile Updated",
      "Error updating profile"
    );
  }
}

export default UpdateProfileForm;
