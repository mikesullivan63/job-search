import { loginService } from "./login";

function handlePrivateResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        loginService.logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

function handleRegistrationResponse(response) {
  return response.text().then(text => {
    if (!response.ok) {
      console.log("Error on registration", response.statusText, text);
      return Promise.reject(JSON.parse(text));
    }
    return text && JSON.parse(text);
  });
}

export const handleResponse = {
  handlePrivateResponse,
  handleRegistrationResponse
};
