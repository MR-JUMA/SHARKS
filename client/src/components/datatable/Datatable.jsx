import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { companyColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { setWarningAlerts, setSuccessAlerts, setErrorAlerts } from '../../actions/darkActions'
import {  getUsersForOwner, deactivateUser } from '../../actions/userActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import UserPopUp from '../forms/UserPopUp'

const Datatable = ({  getUsersForOwner, users, authState, deactivateUser, setWarningAlerts, tigo_transactions, voda_transactions, halo_transactions, air_transactions }) => {
  //window.location.pathname

  const [openModal, setOpen] = useState(false);
  const [page, setPage] = useState('users');
  
  const { owner_users, loading } = users

  const handleDeActivate = (id) => {
    deactivateUser(id)
    setWarningAlerts("User was deactivated!!!")
  };

  const openPopUp = () => {
    setOpen(true);
  };

  const closePopUP = () => {
    setOpen(false);
  };


  useEffect(() => {
    if (window.location.pathname === '/users') {
      getUsersForOwner()
      setPage('users')
    }
    
    //eslint-disable-next-line
  }, [])

  if (loading) {
    return <Spinner/>
  }

  if (owner_users === null && page === "users") {
    return <h2>Add users...</h2>
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {authState.user_is_owner && <div className="deleteButton" onClick={() => handleDeActivate(params.row.id)}>Deactivate</div>}
          </div>
        );
      },
    },
  ];

  if (page === "users") {
    return (
      <div className="datatable">
        <div className="datatableTitle">
          Add New User
          {/* <Link to="/users/new" className="link">
            Add New
          </Link> */}
          {authState.user_is_owner && <div className="link" onClick={openPopUp}>Add New User</div>}
        </div>
        {owner_users !== null && !loading ? (<DataGrid
          className="datagrid"
          rows={owner_users}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />) : <Spinner/>
        }
        {openModal && <UserPopUp closePopUP={closePopUP} openModal={openModal}/>}
      </div>
    );
  }
};


Datatable.propTypes = {
  setWarningAlerts : PropTypes.func.isRequired,
  setSuccessAlerts : PropTypes.func.isRequired,
  setErrorAlerts : PropTypes.func.isRequired,
  getUsersForOwner : PropTypes.func.isRequired,
  deactivateUser : PropTypes.func.isRequired,
  users : PropTypes.object.isRequired,
  authState : PropTypes.object.isRequired,
  tigo_transactions : PropTypes.array,
  voda_transactions : PropTypes.array,
  halo_transactions : PropTypes.array,
  air_transactions : PropTypes.array
}

const mapStateToProps = state => ({
  users : state.user,
  authState : state.authState.user
})

export default connect(mapStateToProps, { setWarningAlerts, setSuccessAlerts, setErrorAlerts, getUsersForOwner, deactivateUser })(Datatable)
