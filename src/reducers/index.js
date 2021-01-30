import {combineReducers} from 'redux';

import loginReducer from './auth';
import appReducer from './app';
import {reducer as network} from 'react-native-offline';

export default combineReducers({
    loginReducer,
    appReducer,
    network,
});
