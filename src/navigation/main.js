import React from 'react';
import {createAppContainer} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon/tabBarIcon';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Profile from '../screens/Profile';
import Logout from '../screens/Logout';
import {connect} from 'react-redux';

const HomeStack = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: ({navigation}) => ({
            headerRight: () => (
                <Logout props={navigation}/>
            ), headerStyle: {
                elevation: 0,
            },
        }),
    },
    Logout: {
        screen: Logout,
    },
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Notas',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={'list'}
            color={'#8ca540'}
        />
    ),
};

const mapStateToProps = state => {
    return {
        permissions: state.loginReducer.permissions,
    };
};

export function routes() {
    return {Perfil: HomeStack};
}

const AppNav = () => {
    const Container = createAppContainer(
        createBottomTabNavigator(
            routes(),
            {
                tabBarOptions: {
                    style: {
                        borderTopWidth: 0.2,
                        borderTopColor: '#D3D3D3',
                        height: 60,
                    },
                },
            },
        ),
    );

    return <Container/>;
};

export default connect(mapStateToProps)(AppNav);
