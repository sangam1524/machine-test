import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import HomeScreen from './Screens/HomeScreen';
import {
  getPersistedLoggedInUser,
  persistLoggedInUser,
  StoredUser,
} from './Local/CheckInLocalStorage';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const [isFetchingUser, setisFetchingUser] = useState(true);

  useEffect(() => {
    const hydrateAuthState = async () => {
      const storedUser = await getPersistedLoggedInUser();
      console.log('storedUser--->>>>',storedUser)
      if (storedUser) {
        setCurrentUser(storedUser);
        setIsAuthenticated(true);
      }
      setisFetchingUser(false);
    };

    hydrateAuthState();
  }, []);

  const handleLoginSuccess = useCallback(async (user: StoredUser) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    await persistLoggedInUser(user);
  }, []);

  const handleLogout = useCallback(async () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    await persistLoggedInUser(null);
  }, []);

  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen">
          {(props) => (
            <LoginScreen
              {...props}
              onLoginSuccess={handleLoginSuccess}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SignUpScreen">
          {(props) => (
            <SignupScreen
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  };

  const MainStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeScreen">
          {(props) => (
            <HomeScreen
              {...props}
              user={currentUser}
              onLogout={handleLogout}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  };

  if (isFetchingUser) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ActivityIndicator size="large" color="#E31E17" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <NavigationContainer>
        {isAuthenticated ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A2828',
  },
});

export default AppNavigator;