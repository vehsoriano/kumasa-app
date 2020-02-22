// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { 
  Button, 
  View, 
  Text, 
  StyleSheet, 
  Image,
  Dimensions, 
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { 
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

import Home from './src/screens/Home'
import Details from './src/screens/Details'
import Login from './src/screens/Login'
import Signup from './src/screens/Signup'
import Profile from './src/screens/Profile'
import OrderHistory from './src/screens/OrderHistory'
import Branch from './src/screens/Branch'
import Cart from './src/screens/Cart'
import Settings from './src/screens/Settings'


const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
import { useSelector, useDispatch} from 'react-redux'
import allActions from './src/actions'


function Routes() { 
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();


  const [visualLoader, setVisualLoader] = useState(true)

  useEffect(() => {
    getToken()
    console.log('get Token')
  }, [])

  async function getToken(){
    try {
      const value = await AsyncStorage.getItem('TOKEN')
      if(value !== null) {
        dispatch(allActions.authActions.login())
        setVisualLoader(false)
        console.log(value)
      } else {
        console.log('null')
      }
    } catch(e) {
      // error reading value
    }
  }

  console.log('Routes---------')
  console.log(auth)

  return (
    <NavigationContainer>
      {
        visualLoader ? (
          <View style={styles.loaderHolder}>
            <Image style={styles.avatar} source={{uri:'https://i.imgur.com/jaT8Frm.png'}}/>
          </View>
        ) : (        
          auth === false ? (  
            <Stack.Navigator initialRouteName="Login" headerMode="none">
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </Stack.Navigator>             
          ) : (
            <Stack.Navigator initialRouteName="Home" >
              <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="OrderHistory" component={OrderHistory} />
              <Stack.Screen name="Cart" component={Cart} />
              <Stack.Screen name="Branch"  component={Branch} options={{headerShown: false}}/>  
              <Stack.Screen name="Settings"  component={Settings} />      
            </Stack.Navigator>
          )         
        )
      }          
    </NavigationContainer>
  );
}

export default Routes;

const styles = StyleSheet.create({
  loaderHolder: {
    flex:1,
    alignContent: 'center',
    justifyContent: 'center',
    width: ScreenWidth,
    height: ScreenHeight,
  },
  avatar: {
    width: ScreenWidth,
    height: 70,
  },
})