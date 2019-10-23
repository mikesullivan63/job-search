function requiredValueCheck(value, label) {
  //Process e-mail
  if (!value || value === "") {
    return [label + " is required"];
  }
  return [];
}

export const validationService = {
  requiredValueCheck
};
