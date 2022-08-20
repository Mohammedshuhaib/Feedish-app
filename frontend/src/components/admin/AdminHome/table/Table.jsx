import React from "react";
import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function TableForm() {
  const rows = [
    {
      id: 1,
      product: "Mints - Striped Red",
      img: "http://dummyimage.com/233x100.png/ff4444/ffffff",
      customer: "Cilka Stut",
      date: "9/7/2021",
      amount: "$2.95",
      method: "cash on delivery",
      stats: "Pending",
    },
    {
      id: 2,
      product: "Snapple Raspberry Tea",
      img: "http://dummyimage.com/192x100.png/ff4444/ffffff",
      customer: "Shelli Aldritt",
      date: "10/24/2021",
      amount: "$8.63",
      method: "Online payment",
      stats: "Success",
    },
    {
      id: 3,
      product: "Butter - Pod",
      img: "http://dummyimage.com/104x100.png/cc0000/ffffff",
      customer: "Licha Elderbrant",
      date: "11/9/2021",
      amount: "$4.12",
      method: "cash on delivery",
      stats: "Success",
    },
    {
      id: 4,
      product: "Mangostein",
      img: "http://dummyimage.com/117x100.png/dddddd/000000",
      customer: "Slade Blore",
      date: "4/13/2022",
      amount: "$9.49",
      method: "Online payment",
      stats: "Pending",
    },
    {
      id: 5,
      product: "Meldea Green Tea Liquor",
      img: "http://dummyimage.com/115x100.png/ff4444/ffffff",
      customer: "Zacherie Fishleigh",
      date: "4/10/2022",
      amount: "$5.89",
      method: "cash on delivery",
      stats: "Success",
    },
    {
      id: 6,
      product: "Venison - Ground",
      img: "http://dummyimage.com/158x100.png/dddddd/000000",
      customer: "Agnesse Joriot",
      date: "4/7/2022",
      amount: "$9.51",
      method: "Online payment",
      stats: "Pending",
    },
    {
      id: 7,
      product: "Veal - Tenderloin, Untrimmed",
      img: "http://dummyimage.com/197x100.png/ff4444/ffffff",
      customer: "Rube Kaygill",
      date: "7/28/2022",
      amount: "$7.18",
      method: "cash on delivery",
      stats: "Success",
    },
    {
      id: 8,
      product: "Cheese - Provolone",
      img: "http://dummyimage.com/184x100.png/5fa2dd/ffffff",
      customer: "Manon Tunnah",
      date: "12/17/2021",
      amount: "$3.54",
      method: "Online payment",
      stats: "Pending",
    },
    {
      id: 9,
      product: "Water - Spring 1.5lit",
      img: "http://dummyimage.com/146x100.png/cc0000/ffffff",
      customer: "Harmonia Chuck",
      date: "3/9/2022",
      amount: "$3.66",
      method: "Online payment",
      stats: "Success",
    },
    {
      id: 10,
      product: "Bread - Hamburger Buns",
      img: "http://dummyimage.com/250x100.png/ff4444/ffffff",
      customer: "Verile Lowrey",
      date: "5/10/2022",
      amount: "$2.24",
      method: "cash on delivery",
      stats: "Pending",
    },
  ];

  return <div className="table">
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='tableCell'>Tracking ID</TableCell>
            <TableCell className='tableCell'>Product</TableCell>
            <TableCell className='tableCell'>Customer</TableCell>
            <TableCell className='tableCell'>Date</TableCell>
            <TableCell className='tableCell'>Amount</TableCell>
            <TableCell className='tableCell'>Payment Methode</TableCell>
            <TableCell className='tableCell'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>;
}

export default TableForm;
