
 import {
  GET_USER,
  ADD_OWNER_USER,
  DELETE_USER,
  SET_CURRENT_USER,
  SET_OWNER_CURRENT_USER,
  GET_OWNER_CURRENT_USER,
  CLEAR_CURRENT_USER,
  UPDATE_OWNER_USERS,
  CLEAR_USERS,
  CLEAR_OWNER_CURRENT_USER,
  SET_USER_LOADING,
  USER_ERROR,
  GET_OWNER_USERS,
  GET_USERS_EMAILS,
  SEARCH_USERS
} from '../actions/types'

 const initialState = {
    owner_users: null,
    owner_current_user: null,
    emails: null,
    loading: false,
    errors: null
};

 /* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action) => {
 switch (action.type) {
    case GET_OWNER_USERS: 
      return {
        ...state, 
        owner_users: action.payload,
        loading: false,
        errors: null
      }
    case GET_OWNER_CURRENT_USER: 
      return {
        ...state, 
        owner_current_user: action.payload,
        loading: false,
        errors: null
      }
    case GET_USERS_EMAILS: 
      return {
        ...state, 
        emails: action.payload,
        loading: false,
        errors: null
      }
    case ADD_OWNER_USER: 
      return {
        ...state, 
        owner_users: action.payload,
        loading: false,
        errors: null
        }
    case USER_ERROR:
      console.error(action.payload)
      return {
        ...state,
        errors: action.payload,
        loading: false
      }
    case UPDATE_OWNER_USERS:
      return {
        ...state, 
        owner_users: state.owner_users.map(user => user.id === action.payload.id ? action.payload : user),
        owner_current_user: action.payload,
        loading: false,
        errors: null
      }
    case DELETE_USER:
      return {
        ...state, 
        // owner_users: state.owner_users.map(user => user.id === action.payload.id ? Object.assign({}, user, {isActive: false}) : user),
        owner_users: state.owner_users.map(user => user.id === action.payload.id ? action.payload : user),
        loading: false,
        errors: null
      }
    case SET_OWNER_CURRENT_USER:
      return {
        ...state, 
        owner_current_user: action.payload,
        loading: false,
        errors: null
      }
    case CLEAR_OWNER_CURRENT_USER:
    return {
      ...state, 
      owner_current_user: null,
      loading: false,
      errors: null
    }
    case SET_CURRENT_USER:
      return {
      ...state, 
      current_user: action.payload,
      loading: false,
      errors: null
      }
    case CLEAR_CURRENT_USER:
    return {
      ...state, 
      current_user: null,
      loading: false,
      errors: null
    }
    case SET_USER_LOADING:
    return {
      ...state, 
      loading: true
    }
    default:
      return {
      ...state
    }
  }
};