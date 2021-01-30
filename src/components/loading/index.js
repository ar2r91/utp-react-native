import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Loading = () => (
    <View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <ActivityIndicator size="large" color={'#8ca540'}/>
    </View>
);

export default Loading;
