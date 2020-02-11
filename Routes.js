// In App.js in a new project

import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './src/screens/Home'
import Details from './src/screens/Details'
import Login from './src/screens/Login'
import Signup from './src/screens/Signup'
import Profile from './src/screens/Profile'
import OrderHistory from './src/screens/OrderHistory'
import Branch from './src/screens/Branch'

import { useSelector } from 'react-redux'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Routes() {

  const auth = useSelector(state => state.authenticate);
  // console.log(auth)
 
  return (
    <NavigationContainer>
      {
        auth.isLogged ? (
          <>
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="Details" component={Details} />
              {/* <Drawer.Screen name="Profile" component={Profile} />
              <Drawer.Screen name="OrderHistory" component={OrderHistory} />
              <Drawer.Screen name="Branch" component={Branch} /> */}
            </Drawer.Navigator>
          </>
        ) : (
          <Stack.Navigator initialRouteName="Login" headerMode="none">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>
        )
      }          
    </NavigationContainer>
  );
}

export default Routes;