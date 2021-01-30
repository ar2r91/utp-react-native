import http from '../helpers/http';
import {
    LOGIN_REQUEST,
    LOGOUT_USER,
    LOGIN_USER,
} from '../constants/actionTypes';
import {forgetItem, setToken} from '../helpers/storage';
import {API_TOKEN} from '../constants/config';

export function loginRequest() {
    return {
        type: LOGIN_REQUEST,
    };
}

export function loginUser(data) {
    return {
        type: LOGIN_USER,
        data,
    };
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
    };
}

export function logout() {
    const url = 'logout';
    return dispatch => {
        return http.post(url, null, true).then(() => {
                forgetItem(API_TOKEN);
                dispatch(logoutUser());
            },
        );
    };
}

export function login(credentials) {
    const url = 'user/login';
    return dispatch => {
        dispatch(loginRequest(true));
        return http.post(url, credentials, false).then(data => {
                if (data) {
                    setToken(data.token).then(() => {
                        dispatch(loginUser(data.user));
                    });
                    dispatch(loginRequest(false));
                    return data;
                }
            },
        ).catch(err => {
            return Promise.reject(err.data);
        });
    };
}
