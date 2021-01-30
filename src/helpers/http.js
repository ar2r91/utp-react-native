import axios from 'axios';
import {API_HEADERS, API_HEADERS_MULTIPART} from '../constants/config';
import {getToken} from './storage';
import {logout} from '../actions/auth';
//import {API_ROOT} from 'react-native-dotenv';
const API_ROOT = 'http://192.168.1.14:3000/api';

async function generateHeaders(includeToken) {
    return await getToken().then(token => {
        if (!includeToken) {
            return API_HEADERS;
        }
        return {
            ...API_HEADERS,
            Authorization: `Bearer ${token}`,
        };
    });
}

async function generateHeadersMultipart(includeToken) {
    return await getToken().then(token => {
        if (!includeToken) {
            return API_HEADERS_MULTIPART;
        }

        return {
            ...API_HEADERS_MULTIPART,
            Authorization: `Bearer ${token}`,
        };
    });
}

axios.interceptors.response.use((response) => {
    return response;
}, error => {
    // handle the response error
    if (error.response.status === 401) {
        logout();
    }
    return Promise.reject(error);
});

const http = {
    get: async (url, includeToken = true) => {
        return generateHeaders(includeToken).then(headers =>
            axios
                .get(`${API_ROOT}/${url}`, {headers})
                .then(response => response.data)
                .catch(err => {
                    return Promise.reject(err.response);
                }),
        );
    },
    patch: async (url, data, includeToken = true) => {
        return generateHeaders(includeToken).then(headers =>
            axios
                .patch(`${API_ROOT}/${url}`, data, {headers})
                .then(response => response.data)
                .catch(err => {
                    return Promise.reject(err.response);
                }),
        );
    },
    post: async (url, data, includeToken = true) => {
        return generateHeaders(includeToken).then(headers =>
            axios
                .post(`${API_ROOT}/${url}`, data, {headers})
                .then(response => response.data)
                .catch(err => {
                    /*console.log('root', `${API_ROOT}/${url}`);
                    console.log('err', err);*/
                    return Promise.reject(err.response);
                }),
        );
    },
    post_multipart: async (url, data, includeToken = true) => {
        return generateHeadersMultipart(includeToken).then(headers =>
            axios
                .post(`${API_ROOT}/${url}`, data, {headers})
                .then(response => response.data)
                .catch(err => {
                    return Promise.reject(err.response);
                }),
        );
    },
    put: async (url, data = {}, includeToken = true) =>
        generateHeaders(includeToken).then(headers =>
            axios
                .put(`${API_ROOT}/${url}`, data, {headers})
                .then(response => response.data)
                .catch(err => {
                    return Promise.reject(err.response);
                }),
        ),
};

export default http;
