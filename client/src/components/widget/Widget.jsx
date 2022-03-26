import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoneyIcon from '@mui/icons-material/Money';
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100000;
  const strAmount = '' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const diff = 60;

  switch (type) {
    case "tigo":
      data = {
        title: "TIGO",
        isMoney: true,
        link: "View Tigo",
        icon: (
          <MoneyIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "voda":
      data = {
        title: "VODACOM",
        isMoney: true,
        link: "View Voda",
        icon: (
          <MoneyIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "halo":
      data = {
        title: "HALOTEL",
        isMoney: true,
        link: "View Halotel",
        icon: (
          <MoneyIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "air":
      data = {
        title: "AIRTEL",
        isMoney: true,
        link: "View Airtel",
        icon: (
          <MoneyIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className={`title ${type}`}>{data.title}</span>
        <span className="counter">
           {strAmount}<span className="currency">{data.isMoney && "tzs"}</span>
        </span>
        <Link to={`/${type}`} style={{ textDecoration: "none" }}>
          <span className="link">{data.link}</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
