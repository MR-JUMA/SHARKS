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

const Tigo = ({ tigo_data, loading, getCompaniesData }) => {

  // const newArray = (arrayObj) => {
  //   var i;
  //   for(i = 0; i < arrayObj.length; i++){
  //     arrayObj[i].id = arrayObj[i]['transactionID'];
  //     delete arrayObj[i].transactionID;
  //   }
  //   return arrayObj
  // }

//   const formatDate = (date) => {
//     var d = new Date(date);
//     var hh = d.getHours();
//     var m = d.getMinutes();
//     var s = d.getSeconds();
//     var dd = "AM";
//     var h = hh;
//     if (h >= 12) {
//         h = hh-12;
//         dd = "PM";
//     }
//     if (h == 0) {
//         h = 12;
//     }
//     m = m<10?"0"+m:m;
    
//     s = s<10?"0"+s:s;

//     /* if you want 2 digit hours: */
//     h = h<10?"0"+h:h;

//     var pattern = new RegExp("0?"+hh+":"+m+":"+s);
//     return date.replace(pattern,h+":"+m+":"+s+" "+dd)
// }

  useEffect(() => {
    getCompaniesData('TIGO')

    //eslint-disable-next-line
  }, [])

  if (loading) {
    return <Spinner/>
  }

  if (tigo_data === null) {
    return <h2>Add records...</h2>
  }


  return (
    <div className="companylist">
      <Sidebar/>
      <div className="complistContainer">
        <Navbar/>
        <div className="datatable">
        <div className="datatableTitle">
          Tigo Records
        </div>
        {tigo_data !== null && !loading ? (<DataGrid
          className="datagrid"
          rows={tigo_data}
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
  tigo_data : PropTypes.array
}

const mapStateToProps = state => ({
  tigo_data : state.transactions.tigo_data,
  loading : state.transactions.loading
})

export default connect(mapStateToProps, { setWarningAlerts, setSuccessAlerts, setErrorAlerts, getCompaniesData })(Tigo)
