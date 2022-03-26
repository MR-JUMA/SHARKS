import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect } from "react";
import { getCompaniesTrasactions, getTrasactions } from '../../actions/transactionActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Home = ({ getCompaniesTrasactions, getTrasactions }) => {

  useEffect(() => {
    getCompaniesTrasactions()
  }, [])

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="tigo" />
          <Widget type="voda" />
          <Widget type="halo" />
          <Widget type="air" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};


Home.propTypes = {
  getCompaniesTrasactions : PropTypes.func.isRequired,
  getTrasactions : PropTypes.func.isRequired
}

export default connect(null, { getCompaniesTrasactions, getTrasactions })(Home)
