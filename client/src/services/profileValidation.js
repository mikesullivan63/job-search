function isValidPassword(password) {
  const errors = [];

  if (password.length < 8 || password.length > 64) {
    errors.push("Passwords must be between 8 and 64 characters");
  }

  if (
    !(
      /[a-z]/.exec(password) &&
      /[A-Z]/.exec(password) &&
      /[1-9]/.exec(password) &&
      /[$^!%#@&*()\-_]/.exec(password)
    )
  ) {
    errors.push(
      "Passwords must contain a lower case letter, an upper case letter, a number and a symbol"
    );
  }

  return errors;
}

function areProfileValuesValid(email, firstName, lastName) {
  const errors = [];

  if (!email || email === "" || email.length === 0) {
    errors.push("Email is required");
  }

  if (!firstName || firstName === "" || firstName.length === 0) {
    errors.push("First Name is required");
  }

  if (!lastName || lastName === "" || lastName.length === 0) {
    errors.push("last Name is required");
  }

  return errors;
}

function requiredValueCheck(value, label) {
  //Process e-mail
  if (!value || value === "") {
    return [label + " is required"];
  }
  return [];
}

export const profileValidationService = {
  isValidPassword,
  areProfileValuesValid,
  requiredValueCheck
};
