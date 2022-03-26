import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  SET_LOADING,
  LOGOUT
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'), 
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  }

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state, 
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state, 
        token: localStorage.getItem('token'), 
        isAuthenticated: null,
        loading: true,
        error: action.payload,
        user: null
      }
    case USER_LOADED:
      return {
        ...state, 
        isAuthenticated : true,
        user : action.payload,
        loading : false
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    case SET_LOADING: 
      return {
        ...state ,  
        loading : true
      };
    default:
      return state
  }
}