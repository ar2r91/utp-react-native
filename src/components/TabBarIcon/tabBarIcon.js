import React from 'react';
import {Avatar} from 'react-native-elements';

export default class TabBarIcon extends React.Component {
    render() {
        return (
            <Avatar size="small" rounded
                    icon={{
                        name: this.props.name,
                        type: 'font-awesome',
                        color: this.props.focused ? this.props.color : 'black',
                    }}
                    activeOpacity={0.7}
            />
        );
    }
}
