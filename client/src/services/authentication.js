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
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user;
}


export function authHeader() {
    // return authorization header with jwt token
    const currentUser = JSON.parse(authenticationService.getCurrentUser());
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}