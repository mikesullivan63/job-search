import ProfileForm from "../common/ProfileForm";
import { profileService } from "../../services/profile";

class UpdateProfileForm extends ProfileForm {
  constructor(props) {
    super(props);

    const user = this.props.store.getUser();

    this.state.fields = this.state.fields = profileService.PROFILE_FIELDS;
    this.state.fields.forEach(field => (field.value = user[field.name]));
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
