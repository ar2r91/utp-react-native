import AsyncStorage from '@react-native-community/async-storage';
import {API_TOKEN} from '../constants/config';

export const forgetItem = key => AsyncStorage.removeItem(key);

export const setToken = token =>
    forgetItem(API_TOKEN).then(
        () =>
            AsyncStorage.setItem(API_TOKEN, token, err => {
                if (err) {
                    throw err;
                }
            }),
        err => {
            console.log(err);
        },
    );

export const getToken = () => AsyncStorage.getItem(API_TOKEN);

