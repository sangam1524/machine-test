import React from 'react';
import {  StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { weatherStore } from './store';
import WeatherScreen from './screens/WeatherScreen';

const AppNavigator: React.FC = () => {
  return (
    <Provider store={weatherStore}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <WeatherScreen />
      </SafeAreaView >
    </Provider>
  );
};

export default AppNavigator;