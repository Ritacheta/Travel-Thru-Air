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

let airports = [
  "CCU Kolkata",
  "BOM Mumbai",
  "FRA Frankfurt",
  "DAC Dhaka",
  "BLR Bangalore",
  "DEL Delhi",
  "MAA Chennai",
  "DOH Doha",
  "SFO San Francisco",
  "JFK New York",
  "DXB Dubai",
];

const searched_flights = [];

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

function jsonToArray(json) {
  return Object.keys(json).map((key) => [key, json[key]]);
}

export default function FlightOption() {
  const [search_option, setBooking_option] = React.useState(initialState);
  const [Is_Round_Trip, setIsRoundTrip] = React.useState(true);

  const handleChange = (e) => {
    setBooking_option({ ...search_option, [e.target.name]: e.target.value });
  };
  const handle_deptDate = (new_date) => {
    setBooking_option({ ...search_option, dep_date: new_date });
  };
  const handle_retDate = (new_date) => {
    setBooking_option({ ...search_option, ret_date: new_date });
  };

  const handleFlightSearch = (e) => {
    e.preventDefault();
    fetch(
      "http://localhost:8081/FlightApp/Flights?fromcity=" +
        search_option.flight_from.split(" ")[0] +
        "&tocity=" +
        search_option.flight_to.split(" ")[0] +
        "&day=" +
        search_option.dep_date.getDay()
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response.flights);
        searched_flights = jsonToArray(response.flights);
      });
    console.log(searched_flights);
  };

  return (
    <div>
      <Card>
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
              value={search_option.booking_type}
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
              value={search_option.booked_class}
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
                  value={search_option.flight_from}
                  name="flight_from"
                />
              )}
            />
            <CompareArrowsIcon
              sx={{
                margin: 2,
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
                  value={search_option.flight_to}
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
              <Box sx={{ padding: 1 }}></Box>
              <DesktopDatePicker
                label="Departure"
                name="dept_date"
                inputFormat="dd/MM/yyyy"
                value={search_option.dep_date}
                onChange={handle_deptDate}
                renderInput={(params) => <TextField {...params} />}
              />
              <Box sx={{ padding: 3 }}></Box>
              {search_option.booking_type === "Round Trip" && (
                <DesktopDatePicker
                  label="Return"
                  name="ret_date"
                  inputFormat="dd/MM/yyyy"
                  value={search_option.ret_date}
                  onChange={handle_retDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            </LocalizationProvider>
          </Box>
          <Button
            variant="contained"
            sx={{
              position: "center",
            }}
            onClick={handleFlightSearch}
          >
            {" "}
            <SearchIcon /> Search
          </Button>
        </CardContent>
      </Card>
      <Box>
        <FlightCard
          flights={searched_flights}
          searched_option={search_option}
        />
      </Box>
    </div>
  );
}
