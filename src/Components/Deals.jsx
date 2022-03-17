import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import FlightCard from './FlightCard';
import Cookies from "js-cookie";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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

function jsonToArray(json) {
	return Object.keys(json).map((key) => [key, json[key]]);
}

let flights = [];
let flight=[];

function Deals() {
	const theme = useTheme();
	const [activeStep, setActiveStep] = useState(0);
	const maxSteps = flights.length;
	const [isBooking, setIsBooking] = useState(false);
	
	var curr =0;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (index) => {
		setActiveStep(index);
		curr = index
	};

	const handleClick = (e) => {
		e.preventDefault();
		setIsBooking(true);
		while(flight.length > 0) {
			flight.pop();
		}
		flight.push(flights[curr]);
	}
	useEffect(() => {
		var url = "http://localhost:8081/FlightApp/Deals";
		if(Cookies.get("deals") == null)
		{
			fetch(url)
			.then((res) => res.json())
			.then((res) => {
				flights = jsonToArray(res);
				Cookies.set("deals", JSON.stringify(res));
			});
		}
		else{
			flights = jsonToArray(JSON.parse(Cookies.get("deals")));
		}
		setIsBooking(false);
	});

	return (
		<div>
		<Box
			sx={{
				height: "90vh",
				paddingTop: "20vh",
				width: "89vw",
				flexFlow: 1,
				flexDirection: "row",
				alignItems:"center",
				textAlign: "center",
				left: "50%",
				display: "flex",
				justifyContent: "center",

			}}
		>
			<AutoPlaySwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
				{flights.length > 0 &&  flights.map((step, index) => (
					<div key={step[0]} className="deals">
						{Math.abs(activeStep - index) <= 3 ? (
							<div
								className="Deals-image"
								style={{
									backgroundImage: `url('https://images.unsplash.com/photo-1596910891038-c79cb84fae3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80')`,
									height: "100vh",
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "top center",
								}}
							>
								<Box
									flexGrow={1}
									sx={{
										height: "100vh",
										overflow: "hidden",
										width: "100vw",
									}}
								>
									<Typography
										variant="h1"
										sx={{
											textAlign: "center",
											alignItems: "center",
											left: "50%",
											display: "flex",
											justifyContent: "center",
											fontFamily: "sans-serif",
											fontWeight: 300,
											fontSize: "6rem",
											lineHeight: 1.167,
										}}
									>
										Special Deals
									</Typography>
									<div>
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												textAlign: "center",
												left: "50%",
												top: "50%",
											}}
										>
											<Typography variant="h2" sx={{ color: "red" }}>
												{step[1]["SOURCE"]}
											</Typography>
										</Box>
									</div>
									<div>
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												textAlign: "center",
												left: "50%",
												top: "50%",
											}}
										>
											<Typography variant="h2" sx={{ color: "grey" }}>
												To
											</Typography>
										</Box>
									</div>
									<div>
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												textAlign: "center",
												left: "50%",
												top: "50%",
											}}
										>
											<Typography variant="h2" sx={{ color: "red" }}>
												{step[1]["DESTINATION"]}
											</Typography>
										</Box>
									</div>
									<div>
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												textAlign: "center",
												left: "50%",
												top: "50%",
											}}
										>
											<Typography variant="h2" sx={{ color: "yellow" }}>
												Rs. {parseInt(step[1]["RATE"])*(1-parseInt(step[1]["DISCOUNT"])/100)}
											</Typography>
										</Box>
									</div>
									<div>
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												textAlign: "center",
												left: "50%",
												top: "50%",
											}}
										>
											<Typography variant="h2" sx={{ color: "yellow" }}>
												{step[1]["DISCOUNT"]}% off!!
											</Typography>
										</Box>
									</div>
									<div>
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												textAlign: "center",
												left: "50%",
												top: "50%",
											}}
										>
											<Button variant="contained" onClick={handleClick}>Let's Go</Button>
										</Box>
									</div>
									<MobileStepper
										steps={flights.length}
										position="absolute"
										activeStep={activeStep}
										sx={{
											bottom: 0,
											position: "absolute",
											width: "100%",
											background: "transperant",
										}}
										nextButton={
											<Button size="small" onClick={handleNext} disabled={activeStep === flights.length - 1}>
												Next
												{theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
											</Button>
										}
										backButton={
											<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
												{theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
												Back
											</Button>
										}
									/>
									
								</Box>
								
							</div>
						) : null}
						
					</div>
				))}
			</AutoPlaySwipeableViews>
			
		</Box>
		{/* <Box>
		{isBooking && <FlightCard flights={flight} dept_date={new Date()}/>}
	</Box> */}
	</div>
	);
}

export default Deals;