import {
  GET_USER,
  ADD_OWNER_USER,
  DELETE_USER,
  SET_CURRENT_USER,
  GET_OWNER_CURRENT_USER,
  SET_OWNER_CURRENT_USER,
  CLEAR_CURRENT_USER,
  UPDATE_OWNER_USERS,
  CLEAR_USERS,
  CLEAR_OWNER_CURRENT_USER,
  SET_USER_LOADING,
  USER_ERROR,
  GET_OWNER_USERS,
  GET_USERS_EMAILS,
  SEARCH_USERS
} from './types'
import axios from 'axios'

//Get User for owner from server
export const getOwnerUser = (id) => async dispatch => {

  try {
      dispatch({ type: SET_USER_LOADING })

      const res = await axios.get(`/user/${id}`)

      dispatch({ type: GET_OWNER_CURRENT_USER, payload: res.data })

    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data
      })
    }
}

//Get Users for owner from server
export const getUsersForOwner = () => async dispatch => {

  try {
      dispatch({ type: SET_USER_LOADING })

      const res = await axios.get('/employees')

      dispatch({ type: GET_OWNER_USERS, payload: res.data })

    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data
      })
    }
}

//Add new user transaction
export const addUser = (user) => async dispatch => {

  dispatch({ type: SET_USER_LOADING })

  const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try {
      const res = await axios.post('/employees', user, config)

      dispatch({ type: ADD_OWNER_USER, payload: res.data })

    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data
      })
    }
}

//Update Owner User 
export const updateUser = (user) => async dispatch => {

  dispatch({ type: SET_USER_LOADING })

  const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try {
      // Make a request for a user with a given ID
      await axios.put(`/employees/${user.id}`, user, config)
        .then(function (response) {
          // handle success
          dispatch({ type: UPDATE_OWNER_USERS, payload: response.data })
        })
        .catch(function (error) {
          // handle error
          dispatch({type: USER_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: "Something went wrong"
      })
    }
}

//Delete user
export const deactivateUser = (id) => async dispatch => {

  dispatch({ type: SET_USER_LOADING })

    try {

      await axios.delete(`/employees/${id}`)
        .then(function (response) {
          // handle success
          dispatch({ type: DELETE_USER, payload: response.data })
        })
        .catch(function (error) {
          // handle error
          dispatch({type: USER_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data
      })
    }
}

//Get Users for owner from server
export const getUsersEmails = () => async dispatch => {

  try {
      dispatch({ type: SET_USER_LOADING })

      const res = await axios.get('/emails')

      dispatch({ type: GET_USERS_EMAILS, payload: res.data })

    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data
      })
    }
}

//Set owner current User
export const setOwnerCurrentUser = (user) => {
  return {
    type: SET_OWNER_CURRENT_USER, payload: user
  }
}

//Clear user 
export const clearOwnerUserCurrent = () => {
  return {
    type: CLEAR_OWNER_CURRENT_USER
  }
}

//Set current User
export const setCurrentUser = (user) => {
  return {
    type: SET_OWNER_CURRENT_USER, payload: user
  }
}

//Clear user 
export const clearUserCurrent = () => {
  return {
    type: CLEAR_CURRENT_USER
  }
}

