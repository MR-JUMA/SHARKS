import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "January", Tigo: 1200, Voda: 500, Halo: 900, Airtel: 500 },
  { name: "February", Tigo: 2100, Voda: 1200, Halo: 600, Airtel: 400 },
  { name: "March", Tigo: 800, Voda: 1000, Halo: 1500, Airtel: 600 },
  { name: "April", Tigo: 1600, Voda: 1100, Halo: 900, Airtel: 500 },
  { name: "May", Tigo: 900, Voda: 1200, Halo: 500, Airtel: 400 },
  { name: "June", Tigo: 1700, Voda: 800, Halo: 1200, Airtel: 900 },
];

const Chart = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="tigo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="voda" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff7f7f" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff7f7f" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="halo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffd580" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffd580" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="airtel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Tigo"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#tigo)"
          />
          <Area
            type="monotone"
            dataKey="Voda"
            stroke="#ff7f7f"
            fillOpacity={1}
            fill="url(#voda)"
          />
          <Area
            type="monotone"
            dataKey="Halo"
            stroke="#ffd580"
            fillOpacity={1}
            fill="url(#halo)"
          />
          <Area
            type="monotone"
            dataKey="Airtel"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#airtel)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
