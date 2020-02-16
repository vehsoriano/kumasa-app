// In App.js in a new project

import * as React from 'react';
import Routes from './Routes'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import vehicle from './src/reducer/cart'
import auth from './src/reducer/login'
import { ThemeProvider } from 'react-native-elements';


const rootReducer = combineReducers({
  first: vehicle,
  authenticate: auth
})

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