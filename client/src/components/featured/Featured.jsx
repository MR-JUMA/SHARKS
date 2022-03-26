import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";



const Featured = () => {
  const amountMadeToday = 300000
  const targetAvgAmount = 310000
  const avgAmountLastWeek = 250000
  const avgAmountLastMonth = 350000


  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue as of today</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">{`${amountMadeToday.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} tzs`}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className={`itemResult ${amountMadeToday <= targetAvgAmount ? 'negative' : 'positive'}`}>
              {amountMadeToday <= targetAvgAmount ? <KeyboardArrowDownIcon fontSize="small"/> : <KeyboardArrowUpOutlinedIcon fontSize="small"/>}
              <div className="resultAmount">{`${targetAvgAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} tzs`}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className={`itemResult ${amountMadeToday <= avgAmountLastWeek ? 'negative' : 'positive'}`}>
              {amountMadeToday <= avgAmountLastWeek ? <KeyboardArrowDownIcon fontSize="small"/> : <KeyboardArrowUpOutlinedIcon fontSize="small"/>}
              <div className="resultAmount">{`${avgAmountLastWeek.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} tzs`}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className={`itemResult ${amountMadeToday <= avgAmountLastMonth ? 'negative' : 'positive'}`}>
              {amountMadeToday <= avgAmountLastMonth ? <KeyboardArrowDownIcon fontSize="small"/> : <KeyboardArrowUpOutlinedIcon fontSize="small"/>}
              <div className="resultAmount">{`${avgAmountLastMonth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} tzs`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
