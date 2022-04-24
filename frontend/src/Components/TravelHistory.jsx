import React, {useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Cookies from 'js-cookie';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
function jsonToArray(json) {
  return Object.keys(json).map((key) => [key, json[key]]);
}
var bookings = [];

export default function TravelHistory(){
  useEffect(() => {
    var url = "http://localhost:8081/FlightApp/Bookings?cid="+Cookies.get("cid");
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
        bookings = jsonToArray(res);
      });
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Booking Id</StyledTableCell>
            <StyledTableCell align="right">Flight Id</StyledTableCell>
            <StyledTableCell align="right">Seats </StyledTableCell>
            <StyledTableCell align="right">Booking Date</StyledTableCell>
            <StyledTableCell align="right">Departure Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((row) => (
            <StyledTableRow key={row[0]}>
              <StyledTableCell component="th" scope="row">
                {row[0]}
              </StyledTableCell>
              <StyledTableCell align="right">{row[1]["FLIGHTID"]}</StyledTableCell>
              <StyledTableCell align="right">{row[1]["SEATS"]}</StyledTableCell>
              <StyledTableCell align="right">{row[1]["BOOKINGDATE"].split(" ")[0]}</StyledTableCell>
              <StyledTableCell align="right">{row[1]["DEPARTUREDATE"].split(" ")[0]}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
  );

}
