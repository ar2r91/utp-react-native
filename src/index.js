import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppStacks from './App';
import {store, persistor} from './store';
import DummyNetworkContext from './DummyNetworkContext';
import {PersistGate} from 'redux-persist/integration/react';

const onlineUrl = 'https://www.google.com/';
const offlineUrl = 'https://www.weifhweopfhwioehfiwoephfpweoifhewifhpewoif.com';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      network: {
        pingUrl: onlineUrl,
        toggleConnection: this.toggleConnection
      }
    }
  }

  toggleConnection = () => {
    this.setState(prevState => ({
      network: {
        ...prevState.network,
        pingUrl:
          prevState.network.pingUrl === onlineUrl ? offlineUrl : onlineUrl,
      },
    }));
  };


  render() {
    const {network} = this.state;
    return (
      <Provider store={store} style={{flex: 1}}>
        <DummyNetworkContext.Provider value={network}>
          <PersistGate loading={null} persistor={persistor}>
            <AppStacks/>
          </PersistGate>
        </DummyNetworkContext.Provider>
      </Provider>
    );
  }
}