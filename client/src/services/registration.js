export const registrationService = {
  register
};

function register(email, first_name, last_name, password, confirm) {
    return new Promise(function(resolve, reject) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, first_name, last_name, password })
          };

        let errors = []

        if(password !== confirm) {
            errors.push("Passwords do not match");
        }

        if(!isValidPassword(password)) {
            errors.push("Passwords must contain a lower case letter, an upper case letter, a number and a symbol");
        }

        reject(errors);

        fetch(`/user/register`, requestOptions)
            .then(handleRegistrationResponse)
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem("currentUser", JSON.stringify(user));
                return resolve(user);
            });
        });
    }

function isValidPassword(password) {
    return /[a-z]/.exec(password) &&
        /[A-Z]/.exec(password) &&
        /[1-9]/.exec(password) &&
        /[$^!%#@&*()-_]/.exec(password)
}

function handleRegistrationResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {  
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
  
      return data;
    })
}