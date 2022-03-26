 

//Set light mode
export const setLightMode = () => async dispatch => {
  dispatch({ type: "LIGHT" })
}

//Set dark mode
export const setDarkMode = () => async dispatch => {
  dispatch({ type: "DARK" })
}

//Toggle
export const setToggle = () => async dispatch => {
  dispatch({ type: "TOOGLE" })
}

//Success Alerts
export const setSuccessAlerts = (alert) => async dispatch => {
  dispatch({ type: "SET_ALERT", payload: {msg: alert, severity: 'success', data: true} })
}

//Warning Alerts
export const setWarningAlerts = (alert) => async dispatch => {
  dispatch({ type: "SET_ALERT", payload: {msg: alert, severity: 'warning', data: true} })
}

//Info Alerts
export const setInfoAlerts = (alert) => async dispatch => {
  dispatch({ type: "SET_ALERT", payload: {msg: alert, severity: 'info', data: true} })
}

//Info Alerts
export const setErrorAlerts = (alert) => async dispatch => {
  dispatch({ type: "SET_ALERT", payload: {msg: alert, severity: 'error', data: true} })
}


//Info Alerts
export const unSetAlerts = () => async dispatch => {
  dispatch({ type: "CLEAR_ALERTS" })
}