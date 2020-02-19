// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Home from './src/screens/Home'
import Details from './src/screens/Details'
import Login from './src/screens/Login'
import Signup from './src/screens/Signup'
import Profile from './src/screens/Profile'
import OrderHistory from './src/screens/OrderHistory'
import Branch from './src/screens/Branch'
import Cart from './src/screens/Cart'
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import { connect, useSelector, useDispatch} from 'react-redux'

function Routes() { 
  const auth = useSelector(state => state.authenticate);
  const dispatch = useDispatch();

  async function getToken(){
    try {
      const value = await AsyncStorage.getItem('TOKEN')
      if(value !== null) {
        dispatch({type: 'LOG_IN'})
      } else {
        // console.log('null')
      }
    } catch(e) {
      // error reading value
    }
  }

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  const logout = () => {
    dispatch({type: 'LOG_OUT'})
    removeToken()
  }

  useEffect(() => {
    getToken()
  }, [])

  console.log(auth.isLogged)


  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {/* <DrawerItem label="Signout" onPress={() => logout()} /> */}
      </DrawerContentScrollView>
    );
  }
  // auth.isLogged

  return (
    <NavigationContainer>
      {
         auth.isLogged ? (
          <>
            <Drawer.Navigator 
              initialRouteName="Home"
              drawerContent={props => CustomDrawerContent(props)}
            >
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="Details" component={Details} />
              {/* <Drawer.Screen name="Profile" component={Profile} /> */}
              <Drawer.Screen name="OrderHistory" component={OrderHistory} />
              <Drawer.Screen 
                name="Cart" 
                component={Cart}                 
                options={{ 
                  drawerLabel: () => null 
                }}      
              />
              <Drawer.Screen 
                name="Branch" 
                component={Branch}                 
                options={{ 
                  drawerLabel: () => null 
                }}      
              />       
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