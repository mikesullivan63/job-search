import { handleResponse } from './handleResponse'

export const authenticationService = {
    login,
    logout,
    getCurrentUser
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`/user/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log("saving user: " + JSON.stringify(user));
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    console.log("removing user: " + JSON.stringify(localStorage.getItem('currentUser')));
    localStorage.removeItem('currentUser');
}

function getCurrentUser() {
    console.log("returning user: " + JSON.stringify(localStorage.getItem('currentUser')));
    const user = localStorage.getItem('currentUser');
    return user;
}


export function authHeader() {
    // return authorization header with jwt token
    const currentUser = JSON.parse(authenticationService.getCurrentUser());
    if (currentUser && currentUser.token) {
        console.log("Returning authorization header: " + currentUser.token);
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        console.log("Returning blank authorization header");
        return {};
    }
}