import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, StatusBar} from 'react-native';

function ReduxNetworkReader({isConnected}) {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={isConnected ? '#8ca540' : 'red'} barStyle="light-content" animated={true}/>
        </View>
    );
}

export default connect(store => ({
    isConnected: store.network.isConnected,
}))(ReduxNetworkReader);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        marginRight: 8,
    },
    value: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
        marginVertical: 7,
    },
    highlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
});
