import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { firebase } from './config/Config';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './navigation/TabNavigator';
import MainStackNavigator from './navigation/MainStackNavigator';
import SignUpScreen from './screens/SignUp';

const Drawer = createDrawerNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
            setLoggedIn(true)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
        setLoggedIn(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {loggedIn ? (
          <Drawer.Screen name="Home" component={TabNavigator} />
        ) : (
            <>
              <Drawer.Screen name="Main" component={MainStackNavigator} />
              <Drawer.Screen name="SignUp" component={SignUpScreen} />
            </>
          )}
      </Drawer.Navigator>
    </NavigationContainer>
  );

}