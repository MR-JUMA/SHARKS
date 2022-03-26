import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import {useState, useEffect} from 'react'
import { setWarningAlerts, setSuccessAlerts, setErrorAlerts } from '../../actions/darkActions'
import { updateUser , addUser } from '../../actions/userActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const UserPopUp = ({closePopUP, openModal, owner_current_user, setSuccessAlerts, setErrorAlerts, addUser, updateUser}) => {

  const [checked, setChecked] = useState(false);
  const [mode, setMode] = useState('Add');

  const [ user, setUser ] = useState({
    id: '0',
    username: '', 
    firstname: '', 
    lastname: '', 
    phonenumber: '', 
    email: '', 
    password: '', 
    city: '0', 
    isActive: 'false'
  })

  useEffect(() => {
    if (owner_current_user !== null) {
      setUser({
        id: owner_current_user.id,
        username: owner_current_user.username, 
        firstname: owner_current_user.firstname, 
        lastname: owner_current_user.lastname, 
        phonenumber: owner_current_user.phonenumber, 
        email: owner_current_user.email, 
        city: owner_current_user.city === null ? "0" : owner_current_user.city,
        password: '', 
        isActive: owner_current_user.isActive.toString()
      })

      setChecked(owner_current_user.isActive)
      setMode('Edit')
    } else {
      setUser({
        id: '',
        username: '', 
        firstname: '', 
        lastname: '', 
        phonenumber: '', 
        email: '', 
        password: '', 
        city: '0', 
        isActive: 'false'
      })

      setChecked(false)
      setMode('Add')
    }
  }, [])

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const handleCheck = (event) => {
    setChecked(event.target.checked)

    if (event.target.checked) {
      setUser({ ...user, isActive: 'true' })
    } else {
      setUser({ ...user, isActive: 'false' })
    }
  };

  const onSubmit = e => {
    e.preventDefault()

    if (user.username === '' || user.firstname === '' || user.lastname === '' || user.email === '' || user.phonenumber === '' || user.city === '0') {
      setErrorAlerts("Please Fill All Required Fields")
      return
    }

    if (owner_current_user === null && mode === 'Add') {
      addUser(user)
      setSuccessAlerts("User Added Successfully!!!")
    } else {
      updateUser(user)
      setSuccessAlerts("User Updated Successfully!!!")
    }

    closePopUP()
  }

  return (
    <div>
      <Dialog open={openModal} onClose={closePopUP}>
        <DialogTitle>{owner_current_user ? `Edit User: ${owner_current_user.id}` : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="username" label="User Name" type="text"  fullWidth  variant="standard" value={user.username} onChange={onChange}/>
          <TextField autoFocus margin="dense" name="firstname" label="First Name" type="text"  fullWidth  variant="standard" value={user.firstname} onChange={onChange}/>
          <TextField autoFocus margin="dense" name="lastname" label="Last Name" type="text"  fullWidth  variant="standard" value={user.lastname} onChange={onChange}/>
          <TextField autoFocus margin="dense" name="phonenumber" label="Phone Number" type="text"  fullWidth  variant="standard" value={user.phonenumber} onChange={onChange}/>
          <TextField autoFocus margin="dense" name="email" label="Email" type="email"  fullWidth  variant="standard" value={user.email} onChange={onChange}/>
          <TextField autoFocus margin="dense" name="password" label="Password" type="password"  fullWidth  variant="standard" value={user.password} onChange={onChange}/>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user.city}
              label="City"
              onChange={onChange}
              name="city"
            >
              <MenuItem value={"0"}>None</MenuItem>
              <MenuItem value={'Dar'}>Dar</MenuItem>
              <MenuItem value={'Moshi'}>Moshi</MenuItem>
              <MenuItem value={'Arusha'}>Arusha</MenuItem>
            </Select>
          </FormControl>
          <FormGroup>
            <FormControlLabel control={<Checkbox name="active" checked={checked} onChange={handleCheck}/>} label="Active" />
            {/* {user.active === "true" ? <FormControlLabel control={<Checkbox name="active" checked={true} onChange={handleCheck}/>} label="Active" /> : <FormControlLabel control={<Checkbox name="active"  onChange={handleCheck}/>} label="Active" />} */}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopUP}>Cancel</Button>
          <Button onClick={onSubmit}>{owner_current_user !== null ? "Edit" : "Submit"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

UserPopUp.propTypes = {
  setWarningAlerts : PropTypes.func.isRequired,
  setSuccessAlerts : PropTypes.func.isRequired,
  setErrorAlerts : PropTypes.func.isRequired,
  addUser : PropTypes.func.isRequired,
  updateUser : PropTypes.func.isRequired,
  owner_current_user : PropTypes.object
}

const mapStateToProps = state => ({
  owner_current_user : state.user.owner_current_user
})

export default connect(mapStateToProps, { setWarningAlerts, setSuccessAlerts, setErrorAlerts, addUser, updateUser })(UserPopUp)