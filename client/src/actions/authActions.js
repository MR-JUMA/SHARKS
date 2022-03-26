import {
  SET_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../actions/types'

import setAuthToken from './setAuthToken'
import axios from 'axios'

//Load User
export  const loadUser = () => async dispatch => {
    //@Load token to global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    } 

    try {
      const res = await axios.get('/auth')

      dispatch({ type: USER_LOADED, payload: res.data })
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.msg })
    }
  }

//Login User
export const login = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type' : 'application/json'
    }
  }

  try {
    let res = await axios.post('/auth', formData, config)

    dispatch({type: LOGIN_SUCCESS, payload: res.data})

    if (localStorage.token) {
      setAuthToken(localStorage.token)
    } 

    res = await axios.get('/auth')

    dispatch({ type: USER_LOADED, payload: res.data })

  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.msg
    })
  }
}

//Logout 
export const logout = () => async dispatch => dispatch({ type : LOGOUT })
//Clear Errors
export const clearErrors = () => async dispatch =>  dispatch({ type : CLEAR_ERRORS })

//Set loading to false 
export const setLoading = () => async dispatch => dispatch({ type : SET_LOADING })