import React, {Component} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {logout} from '../../actions/auth';
import ReduxNetworkReader from '../../components/connection/ReduxNetworkReader';

class Logout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            windowWidth: Dimensions.get('window').width,
            windowHeight: Dimensions.get('window').height,
        };
    }

    logoutApp() {
        const {isConnected} = this.props;
        if (isConnected === true) {
            //this.props.logout();
        } else {
            alert('No hay conexión de internet.');
        }
    }

    render() {
        const {windowWidth} = this.state;

        return (
            <View>
                <ReduxNetworkReader/>
                <View style={{
                    flex: 1,
                    marginTop: 10,
                    marginRight: windowWidth / 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Icon name={'power-off'} raised type={'font-awesome'} color={'red'} onPress={() => this.logoutApp()}
                          size={20}/>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    isConnected: state.network.isConnected,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Logout);
