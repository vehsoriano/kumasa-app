
import auth from './auth'
import cartItems from './cartItems'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  auth,
  cartItems
})

export default rootReducer