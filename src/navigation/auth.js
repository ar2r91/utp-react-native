import { createStackNavigator } from 'react-navigation-stack'

import Login from '../screens/Login'

const AuthenticationNavigator = createStackNavigator(
  {
    Login,
  },
  {
    headerMode: 'none',
  }
)

export default AuthenticationNavigator
