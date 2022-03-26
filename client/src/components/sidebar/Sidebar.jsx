import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddIcon from '@mui/icons-material/Add';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import { Link } from "react-router-dom";

import { setDarkMode, setLightMode, setSuccessAlerts, unSetAlerts } from '../../actions/darkActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Sidebar = ({setDarkMode, setLightMode, setSuccessAlerts}) => {

  const MakeLightMode = () => {
    setLightMode()
  }

  const MakeDarkMode = () => {
    setDarkMode()
    setSuccessAlerts("Easy on the eyes!!!")
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">pesaApp</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/sales" style={{ textDecoration: "none" }}>
            <li>
              <AddIcon className="icon" />
              <span>Daily Sales</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <p className="title">SERVICE</p>
          <Link to="/tigo" style={{ textDecoration: "none" }}>
            <li>
              <AcUnitIcon className="icon" />
              <span>Tigo</span>
            </li>
          </Link>
          <Link to="/voda" style={{ textDecoration: "none" }}>
            <li>
              <BlurOnIcon className="icon" />
              <span>Vodacom</span>
            </li>
          </Link>
          <Link to="/halo" style={{ textDecoration: "none" }}>
            <li>
              <BlurCircularIcon className="icon" />
              <span>Halotel</span>
            </li>
          </Link>
          <Link to="/air" style={{ textDecoration: "none" }}>
            <li>
              <BrightnessLowIcon className="icon" />
              <span>Airtel</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={MakeLightMode}
        ></div>
        <div
          className="colorOption"
          onClick={MakeDarkMode}
        ></div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  setLightMode: PropTypes.func.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  setSuccessAlerts: PropTypes.func.isRequired,
  unSetAlerts: PropTypes.func.isRequired
}



export default connect(null, { setLightMode, setDarkMode, setSuccessAlerts, unSetAlerts })(Sidebar)