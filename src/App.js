/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import createRootNavigator from './navigation';
import Loading from './components/loading';
import {connect} from 'react-redux';
import DummyNetworkContext from './DummyNetworkContext';
import {ReduxNetworkProvider} from 'react-native-offline';
/*import OneSignal from 'react-native-onesignal';
import {ONESIGNAL_APP_ID} from 'react-native-dotenv';
import {setDeviceId} from './actions/app';*/

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };

        /*this.onIds = this.onIds.bind(this);
        this.onReceived = this.onReceived.bind(this);
        this.onOpened = this.onOpened.bind(this);*/
    }

    componentDidMount() {
        /*OneSignal.init(ONESIGNAL_APP_ID);
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);*/
    }

    componentWillUnmount() {
        /*OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);*/
    }

    onReceived(notification) {
        //console.log('Notification received: ', notification);
    }

    onOpened(openResult) {
        /*console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);*/
    }

    /*onIds(device) {
        this.props.setDeviceId(device.userId);
    }*/

    render() {
        const {login} = this.props;
        const {loading} = this.state;
        if (loading === true) {
            return <Loading/>;
        }

        const Layout = createRootNavigator(login.isAuthenticated);
        return (
            <DummyNetworkContext.Consumer>
                {({pingUrl}) => (
                    <ReduxNetworkProvider pingServerUrl={pingUrl}>
                        <Layout/>
                    </ReduxNetworkProvider>
                )}
            </DummyNetworkContext.Consumer>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.loginReducer,
    isConnected: state.network.isConnected,
    user: state.loginReducer.user,
    //device_id: state.appReducer.device_id,
});

const mapDispatchToProps = (dispatch) => ({
    //setDeviceId: (id) => dispatch(setDeviceId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
