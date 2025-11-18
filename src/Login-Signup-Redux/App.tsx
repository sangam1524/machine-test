import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';
import AppNavigator from './AppNavigator';
import { persistor, store } from './redux/store';

const ReduxAuthApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator size="large" color="#E31E17" />} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default ReduxAuthApp;

