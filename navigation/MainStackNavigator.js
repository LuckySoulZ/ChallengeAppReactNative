import React from 'react';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </>
    </Stack.Navigator>
  );
}

export default MainStackNavigator;