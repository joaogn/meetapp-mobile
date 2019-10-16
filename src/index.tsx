import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar, YellowBox } from 'react-native';
import './config/ReactotronConfig';
import { store, persistor } from './store';
import App from './App';

YellowBox.ignoreWarnings(['componentWillMount']);

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#22202C" />
      </PersistGate>
      <App />
    </Provider>
  );
}
