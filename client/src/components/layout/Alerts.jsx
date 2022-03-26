import React, {useState, useEffect} from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { unSetAlerts } from '../../actions/darkActions'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const Alerts = ({alerts, unSetAlerts}) => {
  console.log(alerts)
  // const [open, setOpen] = useState(Boolean(alerts?.data));
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    // setOpen(false);
    unSetAlerts()
  };

  return (
    alerts !== null &&
      <Snackbar open={Boolean(alerts?.data)} autoHideDuration={6000} onClose={handleClose} TransitionComponent={SlideTransition}>
        <Alert onClose={handleClose} severity={alerts.severity} sx={{ width: '100%' }}>
          {alerts.msg}
        </Alert>
      </Snackbar>
  )
}

Alerts.propTypes = {
  alerts: PropTypes.object,
  unSetAlerts: PropTypes.func
}

const mapStateToProps = state => ({
  alerts : state.darkMode.alerts
})

export default connect(mapStateToProps, { unSetAlerts })(Alerts)