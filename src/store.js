// Imports: Dependencies
import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers';
import {createNetworkMiddleware, offlineActionCreators, checkInternetConnection} from 'react-native-offline';
import thunk from 'redux-thunk';

// Imports: Redux
// Middleware: Redux Persist Config
const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
        'loginReducer',
        'appReducer',
        'courseReducer',
        'network',
    ],
    // Blacklist (Don't Save Specific Reducers)
    blacklist: [],
};

const networkMiddleware = createNetworkMiddleware({
    //regexActionType: /^OTHER/,
    //actionTypes: ['POST_STATUS', 'SET_COMPLETED_STATUSES'],
    queueReleaseThrottle: 1000,
});

const middlewares = [networkMiddleware, thunk];

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const {connectionChange} = offlineActionCreators;
// Redux: Store
const store = createStore(
    persistedReducer,
    applyMiddleware(
        ...middlewares,
    ),
);
// Middleware: Redux Persist Persister
let persistor = persistStore(store, null, () => {
    // After rehydration completes, we detect initial connection
    checkInternetConnection().then(isConnected => {
        store.dispatch(connectionChange(isConnected));
    });
});
// Exports
export {
    store,
    persistor,
};
