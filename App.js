// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home'
import Details from './src/screens/Details'
import Login from './src/screens/Login'
import Signup from './src/screens/Signup'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import vehicle from './src/reducer/cart'


const rootReducer = combineReducers({
  first: vehicle
})

const store = createStore(rootReducer)
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;