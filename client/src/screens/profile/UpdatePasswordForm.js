import ProfileForm from "../common/ProfileForm";
import { profileService } from "../../services/profile";

class UpdatePasswordForm extends ProfileForm {
  constructor(props) {
    super(props);

    this.state.fields = [
      {
        name: "oldPassword",
        label: "Current Password",
        icon: "lock",
        type: "password",
        required: true
      }
    ].concat(profileService.PASSWORD_FIELDS);
  }

  submitForm = () => {
    return profileService.updatePassword(
      this.getValueForField("oldPassword"),
      this.getValueForField("password"),
      this.getValueForField("confirm")
    );
  };

  handleSuccess = result => {
    const newFields = this.state.fields.slice().map(field => {
      field.value = "";
      return field;
    });
    this.setState({ fields: newFields });
  };

  render() {
    return this.renderHeaderAndForm(
      "password",
      "Change your password",
      "Update Password",
      "Password Updated",
      "Error updating password"
    );
  }
}
export default UpdatePasswordForm;
