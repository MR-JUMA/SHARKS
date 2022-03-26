import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useRef, useState, useEffect } from "react";
import { setWarningAlerts, setSuccessAlerts, setErrorAlerts } from '../../actions/darkActions'
import { clearCurrentTransaction, setCurrentTransaction ,deleteAirTransaction, deleteHaloTransaction, deleteVodaTransaction, deleteTigoTransaction, updateAirTransaction,updateHaloTransaction, updateVodaTransaction, updateTigoTransaction, addAirTransaction, addHaloTransaction , addTigoTransaction, addVodaTransaction } from '../../actions/transactionActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import "./sales.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

const DailySales = ({ tigo_transactions, voda_transactions, halo_transactions, air_transactions, setWarningAlerts, setSuccessAlerts, setErrorAlerts, user, current_transaction, clearCurrentTransaction, setCurrentTransaction ,deleteAirTransaction, deleteHaloTransaction, deleteVodaTransaction, deleteTigoTransaction, updateAirTransaction,updateHaloTransaction, updateVodaTransaction, updateTigoTransaction, addAirTransaction, addHaloTransaction , addTigoTransaction, addVodaTransaction }) => {

  const [mode, setMode] = useState('Add');
  const [compType, setCompType] = useState('');
  const [agree, setAgree] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [companyError, setCompanyError] = useState(false);

  const [transaction, setTransaction] = useState({
    transactionID: "0",
    transactionType: "WITHDRAW",
    amount: "",
    companyType: "0",
    phonenumber: ""
  });

  useEffect(() => {

    if (current_transaction !== null) {
      setTransaction({
        transactionID: current_transaction.transactionID,
        transactionType: current_transaction.transactionType,
        amount: current_transaction.amount,
        companyType: current_transaction.companyType,
        phonenumber: current_transaction.phonenumber
      })
      setMode('Edit')
    } else {
      setMode('Add')
    }
  }, [current_transaction])

  const onChange = e => setTransaction({ ...transaction, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()

    if ( transaction.transactionType === '' || transaction.amount === '' || transaction.companyType === '0' || transaction.phonenumber === '' ) {
      setErrorAlerts("Please Fill All Required Fields")
      return
    }

    if (transaction.phonenumber.trim().length !== 10) {
      setErrorAlerts("The Number is Incorrect")
      setPhoneError(true)
      return
    }

    if (transaction.companyType.trim() === '0') {
      setErrorAlerts("Please Select Company")
      setCompanyError(true)
      return
    }

    if (current_transaction === null && mode === 'Add') {
      if (transaction.companyType === "TIGO") {
        addTigoTransaction(transaction)
      } else if(transaction.companyType === "VODACOM") {
        addVodaTransaction(transaction)
      } else if(transaction.companyType === "HALOTEL") {
        addHaloTransaction(transaction)
      } else if(transaction.companyType === "AIRTEL") {
        addAirTransaction(transaction)
      }

      setSuccessAlerts("Transaction Added Successfully!!!")
    } else {

      if (transaction.companyType === "TIGO") {
        updateTigoTransaction(transaction)
      } else if(transaction.companyType === "VODACOM") {
        updateVodaTransaction(transaction)
      } else if(transaction.companyType === "HALOTEL") {
        updateHaloTransaction(transaction)
      } else if(transaction.companyType === "AIRTEL") {
        updateAirTransaction(transaction)
      }

      setSuccessAlerts("Transaction Updated Successfully!!!")
    }

    clearTransaction()
  }

  const clearTransaction = () => {
    setTransaction({
        transactionID: "0",
        transactionType: "WITHDRAW",
        amount: "",
        companyType: "0",
        phonenumber: ""
      })

    clearCurrentTransaction()
  }

  //TODO: DELETING FROM PROP DRILLING
  const handleCompDelete = () => {

    if (current_transaction) {
      setAgree(false)

      if (current_transaction.companyType === "TIGO") {
        deleteTigoTransaction(current_transaction)
      } else if(current_transaction.companyType === "VODACOM") {
        deleteVodaTransaction(current_transaction)
      } else if(current_transaction.companyType === "HALOTEL") {
        deleteHaloTransaction(current_transaction)
      } else if(current_transaction.companyType === "AIRTEL") {
        deleteAirTransaction(current_transaction)
      }
    }

    clearTransaction()
  }

  
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="sales-top">
          <div className="display-id" >ID : {current_transaction !== null ? current_transaction.transactionID : 0 }</div>
            <TextField id="sales-phoneNumb" label="Number" variant="outlined" className="sales-phoneNumb" size="small" value={transaction.phonenumber} name="phonenumber" onChange={onChange} error={phoneError}/>
            <TextField id="sales-amount" label="Amount" variant="outlined" className="sales-amount" size="small" value={transaction.amount} name="amount" onChange={onChange}/>
            <Select
              id="demo-simple-select1"
              label="company"
              name="companyType"
              value={transaction.companyType}
              onChange={onChange}
              className="comp-select"
              size="small"
              style={{minWidth: 120}}
              error={companyError}
            >
              <MenuItem className="select-items" value='0'>None</MenuItem>
              <MenuItem className="select-items" value='TIGO'>Tigo</MenuItem>
              <MenuItem className="select-items" value='VODACOM'>Vodacom</MenuItem>
              <MenuItem className="select-items" value='HALOTEL'>Halotel</MenuItem>
              <MenuItem className="select-items" value='AIRTEL'>Airtel</MenuItem>
            </Select>
            <Select
              id="demo-simple-select2"
              label="Payment Method"
              name="transactionType"
              value={transaction.transactionType}
              onChange={onChange}
              className="comp-select"
              size="small"
            >
              <MenuItem value='WITHDRAW'>WITHDRAW</MenuItem>
              <MenuItem value='DEPOSIT'>DEPOSIT</MenuItem>
            </Select>
            <div className="saveDeposit" onClick={onSubmit}>{mode === 'Add' ? "SAVE" : "EDIT"}</div>
            <div className="clearDeposit" onClick={clearTransaction}>CLEAR</div>
        </div>
        <div className="table-container">
          <div className="tableTitle tigo">Tigo Transactions</div>
          {tigo_transactions !== null && <CompanyDetails setCurrentTransaction={setCurrentTransaction} handleCompDelete={handleCompDelete} setCompType={'TIGO'} Rows={tigo_transactions} setAgree={setAgree} agree={agree} clearTransaction={clearTransaction} setMode={setMode}/>}
        </div>
        <div className="table-container">
          <div className="tableTitle voda">Voda Transactions</div>
          {voda_transactions !== null && <CompanyDetails setCurrentTransaction={setCurrentTransaction} handleCompDelete={handleCompDelete} setCompType={'VODACOM'} Rows={voda_transactions} setAgree={setAgree} agree={agree} clearTransaction={clearTransaction} setMode={setMode}/>}
        </div>
        <div className="table-container">
          <div className="tableTitle halo">Halotel Transactions</div>
          { halo_transactions !== null && <CompanyDetails setCurrentTransaction={setCurrentTransaction} handleCompDelete={handleCompDelete} setCompType={'HALOTEL'} Rows={halo_transactions} setAgree={setAgree} agree={agree} clearTransaction={clearTransaction} setMode={setMode}/>}
        </div>
        <div className="table-container">
          <div className="tableTitle air">Airtel Transactions</div>
          {air_transactions !== null && <CompanyDetails setCurrentTransaction={setCurrentTransaction} handleCompDelete={handleCompDelete} setCompType={'AIRTEL'} Rows={air_transactions} setAgree={setAgree} agree={agree} clearTransaction={clearTransaction} setMode={setMode}/>}
        </div>
      </div>
    </div>
  )
}

DailySales.propTypes = {
  setWarningAlerts : PropTypes.func.isRequired,
  setSuccessAlerts : PropTypes.func.isRequired,
  setErrorAlerts : PropTypes.func.isRequired,
  addTigoTransaction : PropTypes.func.isRequired,
  addVodaTransaction : PropTypes.func.isRequired,
  addHaloTransaction : PropTypes.func.isRequired,
  addAirTransaction : PropTypes.func.isRequired,
  updateTigoTransaction : PropTypes.func.isRequired,
  updateVodaTransaction : PropTypes.func.isRequired,
  updateHaloTransaction : PropTypes.func.isRequired,
  updateAirTransaction : PropTypes.func.isRequired,
  deleteTigoTransaction : PropTypes.func.isRequired,
  deleteVodaTransaction : PropTypes.func.isRequired,
  deleteHaloTransaction : PropTypes.func.isRequired,
  deleteAirTransaction : PropTypes.func.isRequired,
  clearCurrentTransaction : PropTypes.func.isRequired,
  setCurrentTransaction : PropTypes.func.isRequired,
  user : PropTypes.object,
  current_transaction : PropTypes.object
}

const mapStateToProps = state => ({
  user : state.transactions.user,
  tigo_transactions : state.transactions.tigo_transactions,
  voda_transactions : state.transactions.voda_transactions,
  halo_transactions : state.transactions.halo_transactions,
  air_transactions : state.transactions.air_transactions,
  current_transaction : state.transactions.current_transaction
})


export default connect(mapStateToProps, { clearCurrentTransaction, setCurrentTransaction ,deleteAirTransaction, deleteHaloTransaction, deleteVodaTransaction, deleteTigoTransaction, updateAirTransaction, updateHaloTransaction, updateVodaTransaction, updateTigoTransaction, addAirTransaction, addHaloTransaction , addTigoTransaction, addVodaTransaction, setWarningAlerts, setSuccessAlerts, setErrorAlerts })(DailySales)


const CompanyDetails = ({ setCurrentTransaction,  handleCompDelete , Rows, setAgree, agree, clearTransaction, setMode}) => {

  const [showDialog, setShowDialog] = useState(false);
  const [total, setTotal] = useState(0);
  // const total = useRef(0);

  useEffect(() => {
    setTotal(Rows.map(item => parseInt(item.amount)).reduce((prev, curr) => prev + curr, 0))
  }, [Rows])
  
  const handleDelete = (id) => {
    setShowDialog(true)
    setCurrentTransaction(Rows.filter((item) => item.transactionID === id)[0])
    scrollToTop()
    setMode('Delete')
  };

  const handleEdit = (id) => {
    setCurrentTransaction(Rows.filter((item) => item.transactionID === id)[0])
    scrollToTop()
    setMode('Edit')
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  return (
    <div className="container-table">
      {showDialog && <AlertDialog showDialog={showDialog} setShowDialog={setShowDialog} setAgree={setAgree} handleCompDelete={handleCompDelete} clearTransaction={clearTransaction}/>}
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell">Customer</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
              <TableCell className="tableCell">Type</TableCell>
              <TableCell className="tableCell">Status</TableCell>
              <TableCell className="tableCell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Rows.map((row) => (
              <TableRow key={row.transactionID}>
                <TableCell className="tableCell">{row.transactionID}</TableCell>
                <TableCell className="tableCell">{row.phonenumber !== "" && [(row.phonenumber + '').slice(0, 4), '-', (row.phonenumber + '').slice(4)].join('')}</TableCell>
                <TableCell className="tableCell">{(row.amount + '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                <TableCell className="tableCell">{row.transactionType}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
                <TableCell className="tableCell">
                  <div className="cellAction">
                    <div className="editButton" onClick={() => handleEdit(row.transactionID)}>Edit</div>
                    <div className="deleteButton" onClick={() => handleDelete(row.transactionID)}>Delete</div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              {/* <TableCell className="tableCell" rowSpan={3} /> */}
              <TableCell className="tableCell" colSpan={2}>Total</TableCell>
              <TableCell className="tableCell" align="right">{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}



const AlertDialog = ({showDialog, setAgree, setShowDialog, handleCompDelete, clearTransaction }) => {
  const [open, setOpen] = useState(Boolean(showDialog));

  const CloseAndDelete = () => {
    setAgree(true);
    setShowDialog(false);
    setOpen(false);
    handleCompDelete()
  }
  const handleClose = () => {
    setOpen(false);
    setAgree(false);
    setShowDialog(false);
    clearTransaction()
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={CloseAndDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}