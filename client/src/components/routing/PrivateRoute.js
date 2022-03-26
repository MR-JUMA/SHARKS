import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux'

const PrivateRoute = ({ authState }) => {

  const auth = authState.isAuthenticated; // determine if authorized, from context or however you're doing it


  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

const mapStateToProps = state => ({
  authState : state.authState
})

export default connect(mapStateToProps)(PrivateRoute)