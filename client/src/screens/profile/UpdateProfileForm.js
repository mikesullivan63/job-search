import React from "react";
import { Header, Form, Message, Segment, Button } from "semantic-ui-react";
import ProfileTextField from "../common/ProfileTextField";
import { profileValidationService } from "../../services/profileValidation";
import { profileService } from "../../services/profile";

class UpdateProfileForm extends React.Component {
  constructor(props) {
    super(props);

    const user = this.props.store.getUser();
    console.log("Setting defaults for form", JSON.stringify(user, null, 2));

    this.state = {
      profileLoading: false,
      profileUpdated: false,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      emailErrors: [],
      firstNameErrors: [],
      lastNameErrors: [],
      profileFormErrors: []
    };

    this.validateAndSubmitProfile = this.validateAndSubmitProfile.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  validateAndSubmitProfile(event) {
    console.log(
      "Processing form submission",
      JSON.stringify(this.state, null, 2)
    );

    event.preventDefault();

    this.setState({
      emailErrors: [],
      firstNameErrors: [],
      lastNameErrors: [],
      profileFormErrors: []
    });
    const { email, firstName, lastName } = this.state;

    //Process e-mail
    const errors = {};
    errors.emailErrors = profileValidationService.requiredValueCheck(
      email,
      "Email"
    );
    errors.firstNameErrors = profileValidationService.requiredValueCheck(
      firstName,
      "First Name"
    );
    errors.lastNameErrors = profileValidationService.requiredValueCheck(
      lastName,
      "Last Name"
    );

    this.setState(errors);

    const clean =
      errors.emailErrors.length === 0 &&
      errors.firstNameErrors.length === 0 &&
      errors.lastNameErrors.length === 0;

    if (clean) {
      console.log("Submitting form");

      this.setState({ profileLoading: true, profileUpdated: false });
      profileService
        .updateProfile(email, firstName, lastName)
        .then(user => {
          console.log("Profile Updated");

          this.setState({
            profileLoading: false,
            profileUpdated: true,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            emailErrors: [],
            firstNameErrors: [],
            lastNameErrors: [],
            profileFormErrors: []
          });
        })
        .catch(error => {
          console.log(
            "Submitting form resulted in error",
            JSON.stringify(error, null, 2)
          );

          this.setState({
            profileLoading: false,
            profileUpdated: false,
            profileFormErrors: [].concat(error)
          });
        });
    }
  }

  render() {
    console.log(
      "Rendering UpdateProfileForm section",
      JSON.stringify(this.state, null, 2)
    );
    return (
      <React.Fragment>
        <Header as="h2" color="teal" textAlign="center">
          Edit your profile
        </Header>
        <Form
          size="large"
          loading={this.state.profileLoading}
          error={this.state.profileFormErrors.length > 0}
          success={this.state.profileUpdated}
          onSubmit={this.validateAndSubmitProfile}
        >
          {this.state.profileFormErrors.length > 0 && (
            <Message
              error
              header="Error updating profile"
              list={this.state.profileFormErrors}
            />
          )}
          {this.state.profileUpdated && (
            <Message positive header="Profile Updated" />
          )}
          <Segment>
            <ProfileTextField
              form="profile"
              name="email"
              icon="user"
              label="E-mail address"
              placeholder="E-mail address"
              value={this.state.email}
              errors={this.state.emailErrors}
              handleChange={this.handleChange}
            />
            <ProfileTextField
              form="profile"
              name="firstName"
              label="First Name"
              placeholder="First Name"
              value={this.state.firstName}
              errors={this.state.firstNameErrors}
              handleChange={this.handleChange}
            />
            <ProfileTextField
              form="profile"
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              value={this.state.lastName}
              errors={this.state.lastNameErrors}
              handleChange={this.handleChange}
            />
            <Form.Field
              id="profile-form-button"
              control={Button}
              content="Update Profile"
              label=""
              color="teal"
              fluid
              size="large"
              onClick={event => this.validateAndSubmitProfile(event)}
            />
          </Segment>
        </Form>
      </React.Fragment>
    );
  }
}

export default UpdateProfileForm;
