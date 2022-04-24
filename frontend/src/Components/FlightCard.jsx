import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import flightIcon from "../assets/flight-ticket.png";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import axios from "axios";
import Auth from "./Auth";
import TravelHistory from "./TravelHistory";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});


let airports = {
	CCU: "Kolkata",
	BOM: "Mumbai",
	FRA: "Frankfurt",
	DAC: "Dhaka",
	BLR: "Bangalore",
	DEL: "Delhi",
	MAA: "Chennai",
	DOH: "Doha",
	SFO: "San Francisco",
	JFK: "New York",
	DXB: "Dubai",
};

function padTo2Digits(num) {
	return num.toString().padStart(2, "0");
}

function formatDate(date) {
	return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join("/");
}

export default function FlightCard(props) {
	const theme = useTheme();
	const flights = props.flights;
	const search_option = props.search_option;
	const [isbooking, setIsBooking] = React.useState(false);
	const [isSuccess, setIsSuccess] = React.useState(false);
	//console.log(flights)
	let params = {
		cid: Cookies.get("cid"),
		fid: "",
		seats: "",
		bdate: new Date().toLocaleDateString(), // "dd/mm/yyyy"
		ddate: "",
	};
	const handleBooking = (e) => {
		e.preventDefault();
		const url = "http://localhost:8081/FlightApp/BookFlight";
		
		setIsSuccess(false);
		params.fid=e.target.id;
		params.ddate=search_option.dept_date.toLocaleDateString();
		params.seats = String(search_option.total_person)
		//params.cid = Cookies.get("cid")
		setIsBooking(true);
		console.log(params);
		if(Cookies.get("cid")!=null){
			params.cid = Cookies.get("cid")
			axios.get(url, {params}).then((response) => {
				if (response.status != 200) {
					console.log(response.status);
					return;
				}
				else{
					setIsSuccess(true);
				}
			});
		}
		
	};
	return (
		<Box sx={{ backgroundColor: "white" }}>
			{flights.map((flight) => {
				return (
					<Paper
						sx={{
							p: 2,
							margin: "auto",
							backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#eff"),
							marginTop: "2px",
							borderWidth: "1px",
							borderColor: "black",
							borderRadius: "0%",
						}}
						key={flight[0]}
					>
						<Grid container spacing={2}>
							<Grid item>
								<ButtonBase sx={{ width: 60, height: 60 }}>
									<Img alt="complex" src={flightIcon} />
								</ButtonBase>
							</Grid>
							<Grid item xs>
								<Typography component="div" variant="subtitle1">
									{flight[1]["CARRIER"]} - {flight[0]}
								</Typography>
								<Typography component="div" variant="subtitle1">
									B: {flight[1]["BCAPACITY"]} &nbsp; E: {flight[1]["ECAPACITY"]}
								</Typography>
							</Grid>
							<Grid item xs>
								<Typography variant="subtitle1" color="text.secondary" component="div" alignItems="center">
									{flight[1]["DEPARTURE"]} {formatDate(search_option.dept_date)}
								</Typography>
								<Typography variant="subtitle1" color="text.secondary" component="div" alignItems="center">
									{flight[1]["ARRIVAL"]} { parseInt((flight[1]["ARRIVAL"]).substring(0, 2)) > parseInt((flight[1]["DEPARTURE"]).substring(0, 2)) ? formatDate(search_option.dept_date): formatDate(new Date(search_option.dept_date.getTime() + 3600*24*1000))}
								</Typography>
							</Grid>
							<Grid item xs>
								<Typography variant="subtitle1" color="text.secondary" component="div" alignItems="center">
									Stops: {flight[1]["STOPS"]}
								</Typography>
								{parseInt(flight[1]["STOPS"]) > 0 &&
								<Typography variant="subtitle1" color="text.secondary" component="div" alignItems="center">
									Stop Cities: {flight[1]["STOPNAMES"]} ({airports[flight[1]["STOPNAMES"]]})
								</Typography>}
							</Grid>
							<Grid item xs sx={{ alignItems: "right", justifyContent: "end" }}>
								<Typography sx={{ right: "0%" }}>Rs. {flight[1]["RATE"]}</Typography>
								<button onClick={handleBooking} id={flight[0]}>
									Book Now
								</button>
							</Grid>
						</Grid>
					</Paper>
				);
			})}
			{isbooking? (Cookies.get("cid") != null? (isSuccess? <TravelHistory /> : null) : <Auth />) : null}
		</Box>
	);
}
