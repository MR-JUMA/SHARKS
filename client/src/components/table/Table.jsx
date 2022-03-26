import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  let amount = 100000
  let strAmount = '' + amount
  const rows = [
    {
      id: 1,
      company: "Tigo",
      customer: "0710-503399",
      date: "1 March",
      amount: strAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      method: "Deposit",
      status: "Approved",
    },
    {
      id: 2,
      company: "Tigo",
      customer: "0710-503399",
      date: "1 March",
      amount: strAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      method: "Deposit",
      status: "Pending",
    },
    {
      id: 3,
      company: "Tigo",
      customer: "0710-503399",
      date: "1 March",
      amount: strAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      method: "Deposit",
      status: "Pending",
    },
    {
      id: 4,
      company: "Tigo",
      customer: "0710-503399",
      date: "1 March",
      amount: strAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      method: "Deposit",
      status: "Pending",
    },
    {
      id: 5,
      company: "Tigo",
      customer: "0710-503399",
      date: "1 March",
      amount: strAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      method: "Deposit",
      status: "Deleted",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.company}</TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
