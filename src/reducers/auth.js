import {
    LOGIN_REQUEST,
    LOGOUT_USER,
    LOGIN_USER,
    USER_PERMISSIONS,
    USER_POSITION,
} from '../constants/actionTypes';

const initialState = {
    isFetching: false,
    isAuthenticated: false,
    auth: null,
    user: null,
    permissions: [],
};

export default function loginReducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOGOUT_USER:
            return {...state, isAuthenticated: false, isFetching: false, user: null};
        case LOGIN_REQUEST:
            return {...state, isFetching: action.data};
        case USER_PERMISSIONS:
            return {...state, permissions: action.data};
        case LOGIN_USER:
            return {
                ...state, user: action.data, isAuthenticated: true,
            };
        default:
            return state;
    }
}
