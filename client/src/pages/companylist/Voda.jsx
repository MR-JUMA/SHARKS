import React from 'react'
import "./companylist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable"

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { companyColumns } from "../../datatablesource";
import { useEffect, useState } from "react";
import { setWarningAlerts, setSuccessAlerts, setErrorAlerts,  } from '../../actions/darkActions'
import {  getCompaniesData } from '../../actions/transactionActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../../components/layout/Spinner'

const Voda = ({ voda_data, loading, getCompaniesData }) => {

  useEffect(() => {
    getCompaniesData('VODA')

    //eslint-disable-next-line
  }, [])

  if (loading) {
    return <Spinner/>
  }

  if (voda_data === null) {
    return <h2>Add records...</h2>
  }


  return (
    <div className="companylist">
      <Sidebar/>
      <div className="complistContainer">
        <Navbar/>
        <div className="datatable">
        <div className="datatableTitle">
          Voda Records
        </div>
        {voda_data !== null && !loading ? (<DataGrid
          className="datagrid"
          rows={voda_data}
          columns={companyColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />) : <Spinner/>
        }
      </div>
      </div>
    </div>
  )
}

Datatable.propTypes = {
  setWarningAlerts : PropTypes.func.isRequired,
  setSuccessAlerts : PropTypes.func.isRequired,
  setErrorAlerts : PropTypes.func.isRequired,
  loading : PropTypes.bool,
  voda_data : PropTypes.array
}

const mapStateToProps = state => ({
  voda_data : state.transactions.voda_data,
  loading : state.transactions.loading
})

export default connect(mapStateToProps, { setWarningAlerts, setSuccessAlerts, setErrorAlerts, getCompaniesData })(Voda)
