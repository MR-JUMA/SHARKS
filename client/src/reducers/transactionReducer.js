import {
  GET_USER_TRANSACTIONS, 
  ADD_TIGO_TRASACTION, 
  ADD_HALO_TRASACTION, 
  ADD_VODA_TRASACTION, 
  ADD_AIR_TRASACTION, 
  DELETE_TIGO_TRANSACTION, 
  DELETE_HALO_TRANSACTION, 
  DELETE_VODA_TRANSACTION,
  DELETE_AIR_TRANSACTION,
  SET_CURRENT_TRASACTION,
  CLEAR_CURRENT_TRANSACTION,
  UPDATE_TIGO_TRASACTION,
  UPDATE_VODA_TRASACTION,
  UPDATE_HALO_TRASACTION,
  UPDATE_AIR_TRASACTION,
  CLEAR_TRANSACTIONS,
  SET_TRANSACTION_LOADING,
  TRANSACTION_ERROR,
  SEARCH_TRANSACTIONS
} from '../actions/types'

const initalState = {
  user: null,
  current_transaction: null,
  tigo_transactions: null,
  voda_transactions: null,
  halo_transactions: null,
  air_transactions: null,
  tigo_data: null,
  voda_data: null,
  halo_data: null,
  air_data: null,
  loading: false,
  error: null
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initalState, action) => {
  switch(action.type) {
    case GET_USER_TRANSACTIONS:
      return {
        ...state, 
        user: action.payload,
        loading: false
      }
    case "SET_TIGO_DATA":
      return {
        ...state, 
        tigo_data: action.payload,
        loading: false
      }
    case "SET_VODA_DATA":
      return {
        ...state, 
        voda_data: action.payload,
        loading: false
      }
    case "SET_HALO_DATA":
      return {
        ...state, 
        halo_data: action.payload,
        loading: false
      }
    case "SET_AIR_DATA":
      return {
        ...state, 
        air_data: action.payload,
        loading: false
      }
    case "SET_TIGO":
      return {
        ...state, 
        tigo_transactions: action.payload,
        loading: false
      }
    case "SET_VODA":
      return {
        ...state, 
        voda_transactions: action.payload,
        loading: false
      }
    case "SET_HALO":
      return {
        ...state, 
        halo_transactions: action.payload,
        loading: false
      }
    case "SET_AIR":
      return {
        ...state, 
        air_transactions: action.payload,
        loading: false
      }
    case ADD_TIGO_TRASACTION:
      return {
        ...state, 
        tigo_transactions: [ action.payload, ...state.tigo_transactions ],
        loading: false
      }
    case ADD_VODA_TRASACTION:
      return {
        ...state, 
        voda_transactions: [ action.payload, ...state.voda_transactions ],
        loading: false
      }
    case ADD_HALO_TRASACTION:
      return {
        ...state, 
        halo_transactions: [ action.payload, ...state.halo_transactions ],
        loading: false
      }
    case ADD_AIR_TRASACTION:
      return {
        ...state, 
        air_transactions: [ action.payload, ...state.air_transactions ],
        loading: false
      }
    
    case UPDATE_TIGO_TRASACTION:
      return {
        ...state, 
        tigo_transactions: state.tigo_transactions.map(tigo => tigo.transactionID === action.payload.transactionID ? action.payload : tigo),
        loading: false
      }

    case UPDATE_VODA_TRASACTION:
      return {
        ...state, 
        voda_transactions: state.voda_transactions.map(voda => voda.transactionID === action.payload.transactionID ? action.payload : voda),
        loading: false
      }

    case UPDATE_HALO_TRASACTION:
      return {
        ...state, 
        halo_transactions: state.halo_transactions.map(halo => halo.transactionID === action.payload.transactionID ? action.payload : halo),
        loading: false
      }

    case UPDATE_AIR_TRASACTION:
      return {
        ...state, 
        air_transactions: state.air_transactions.map(air => air.transactionID === action.payload.transactionID ? action.payload : air),
        loading: false
      }

    case DELETE_TIGO_TRANSACTION:
      return {
        ...state, 
        tigo_transactions: state.tigo_transactions.map(tigo => tigo.transactionID === action.payload.transactionID ? action.payload : tigo),
        // tigo_transactions: state.tigo_transactions.map(tigo => tigo.transactionID === action.payload.transactionID ? Object.assign({}, tigo, {status: "Deleted"}) : tigo),
        loading: false
      }

    case DELETE_VODA_TRANSACTION:
      return {
        ...state, 
        voda_transactions: state.voda_transactions.map(voda => voda.transactionID === action.payload.transactionID ? action.payload : voda),
        loading: false
      }

    case DELETE_HALO_TRANSACTION:
      return {
        ...state, 
        halo_transactions: state.halo_transactions.map(halo => halo.transactionID === action.payload.transactionID ? action.payload : halo),
        loading: false
      }

    case DELETE_AIR_TRANSACTION:
      return {
        ...state, 
        air_transactions: state.air_transactions.map(air => air.transactionID === action.payload.transactionID ? action.payload : air),
        loading: false
      }
    case SET_CURRENT_TRASACTION:
      return {
        ...state, 
        current_transaction: action.payload,
        loading: false
      }
    
    case CLEAR_CURRENT_TRANSACTION:
      return {
        ...state, 
        current_transaction: null,
        loading: false
      }
    
    case SET_TRANSACTION_LOADING:
      return {
        ...state,
        loading: true
      }
    case TRANSACTION_ERROR:
      console.error(action.payload)
      return {
        ...state,
        error: action.payload
      }
    default: 
      return {
      ...state
    }
  }
}