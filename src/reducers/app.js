import {
    IS_FETCHING,
    SET_APP_ID,
    SET_DEVICE_ID,
    SET_DEPARTURES
} from '../constants/actionTypes';

const initialState = {
    device_id: null,
    departures: []
};

export default function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_DEVICE_ID:
            return {...state, device_id: action.data};
        case SET_DEPARTURES:
            return {...state, departures: action.data};
        default:
            return state;
    }
}
