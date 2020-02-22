// In App.js in a new project

import * as React from 'react';
import Routes from './Routes'
import { ThemeProvider } from 'react-native-elements';

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
// import vehicle from './src/reducer/cart'
// import auth from './src/reducer/auth'
// import cartItems from './src/reducer/cartItems'

import rootReducer from './src/reducer'

const store = createStore(rootReducer)

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;