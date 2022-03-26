import { combineReducers } from "redux";
import userReducer from './userReducer'
import transactionReducer from './transactionReducer'
import darkModeReducer from './darkModeReducer'
import authReducer from './authReducer'

export default combineReducers({
  user : userReducer, 
  transactions : transactionReducer,
  darkMode : darkModeReducer,
  authState : authReducer
})