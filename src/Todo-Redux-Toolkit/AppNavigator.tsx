import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyStore from './redux/MyStore';
import Users from './screens/Users';
import AddUser from './screens/AddUser';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Provider store={MyStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Users' component={Users} />
          <Stack.Screen name='AddUser' component={AddUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigator;
