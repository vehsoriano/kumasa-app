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

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import { connect, useSelector, useDispatch} from 'react-redux'
import allActions from './src/actions'

import { TouchableOpacity } from 'react-native-gesture-handler';

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

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  const removeTokenID = async () => {
    try {
      await AsyncStorage.removeItem('USER_ID');
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  const logout = () => {
    // dispatch({type: 'LOG_OUT'})
    dispatch(allActions.authActions.logout())
    removeToken()
    removeTokenID()
  }  

  console.log('---------')
  console.log(auth)


  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <View>
          <Text>
            asdasdasdasd
          </Text>
        </View>
        <DrawerItemList {...props} />
        {/* <DrawerItem label="Signout" onPress={() => logout()} /> */}
        <View>
          <TouchableOpacity onPress={() => logout()}>
            <Text>
              Signout
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    );
  }
  // auth.isLogged

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
                  drawerLabel: () => null ,
                }}      
              />       
            </Drawer.Navigator>
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