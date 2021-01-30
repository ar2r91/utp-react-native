import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Main from './main';
import Auth from './auth';

const SignedOut = Auth;
const SignedIn = Main;

const createRootNavigator = (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignedIn, // when the user is signed in
        SignedOut, // when the user is signed out
      },
      {
        initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
      }
    )
  );
export default createRootNavigator;
