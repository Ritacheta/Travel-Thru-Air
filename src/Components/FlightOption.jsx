import * as React from "react";
import {
  Autocomplete,
  TextField,
  CardContent,
  CardActions,
  Card,
  Select,
  FormControl,
  MenuItem,
  Box,
  InputLabel,
  Button,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SearchIcon from "@mui/icons-material/Search";
import FlightCard from "./FlightCard";

const initialState = {
  booking_type: "Round Trip",
  total_person: 1,
  booked_class: "Economy",
  flight_from: "",
  flight_to: "",
  dep_date: new Date(),
  ret_date: new Date(),
};
const airports = ["Inida", "Kol"];

export default function FlightOption() {
  const [booking_option, setBooking_option] = React.useState(initialState);
  const [Is_Round_Trip, setIsRoundTrip] = React.useState(true);

  const handleChange = (e) => {
    setBooking_option({ ...booking_option, [e.target.name]: e.target.value });
  };
  const handle_deptDate = (new_date) => {
    setBooking_option({ ...booking_option, dep_date: new_date });
  };
  const handle_retDate = (new_date) => {
    setBooking_option({ ...booking_option, ret_date: new_date });
  };
  return (
    <div>
      <Card sx={{ minWidth: 120 }}>
        <CardContent>
          <FormControl
            sx={{
              width: "20%",
              padding: 3,
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="booking_type"
              onChange={handleChange}
              value={booking_option.booking_type}
            >
              <MenuItem value={"Round Trip"}>Round Trip</MenuItem>
              <MenuItem value={"One Way"}>One Way</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              width: "15%",
              padding: 3,
            }}
          >
            <TextField
              label="Total Person"
              variant="outlined"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl
            sx={{
              width: "20%",
              padding: 3,
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="booking_class"
              onChange={handleChange}
              value={booking_option.booked_class}
            >
              <MenuItem value={"Economy"}>Economy</MenuItem>
              <MenuItem value={"Business"}>Business</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              flexGrow: 5,
            }}
          >
            <Autocomplete
              id="country-select-demo"
              sx={{ width: "20%", padding: 3, paddingTop: 0 }}
              options={airports}
              autoHighlight
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Where from?"
                  onChange={handleChange}
                  value={booking_option.flight_from}
                  name="flight_from"
                />
              )}
            />
            <CompareArrowsIcon
              sx={{
                margin:2
              }}
            />
            <Autocomplete
              id="country-select-demo"
              sx={{ width: "20%", padding: 3, paddingTop: 0 }}
              options={airports}
              autoHighlight
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Where to?"
                  onChange={handleChange}
                  value={booking_option.flight_to}
                  name="flight_to"
                />
              )}
            />
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              sx={{
                padding: 3,
              }}
            >
              <Box sx={{padding:1}}>
              </Box>
              <DesktopDatePicker
                label="Departure"
                name="dept_date"
                inputFormat="dd/MM/yyyy"
                value={booking_option.dep_date}
                onChange={handle_deptDate}
                renderInput={(params) => <TextField {...params} />}
              />
              <Box sx={{padding:3}}>
              </Box>
              <DesktopDatePicker
                label="Return"
                name="ret_date"
                inputFormat="dd/MM/yyyy"
                value={booking_option.ret_date}
                onChange={handle_retDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Button
            variant="contained"
            sx={{
              position: "center",
            }}
          >
            {" "}
            <SearchIcon /> Search
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
