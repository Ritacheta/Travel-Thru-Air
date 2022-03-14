import React from "react";
import Typography from "@mui/material/Typography";
import homeImage from "../assets/home.jpg";
import Box from "@mui/material/Box";
import FlightOption from "./FlightOption";
import Deals from "./Deals";
import FlightCard from "./FlightCard";

const Flights = () => {
	return (
		<div>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Deals/> 
				<Box
					component="img"
					sx={{
						padding: "2%",
						width: "60%",
						display: "flex",
						alignSelf: "center",
						justifyContent: "center",
						alignItems: "center",
						margin: "auto",
					}}
					alt="Home"
					src={homeImage}
				/>
				<Box
					sx={{
						justifyContent: "center",
					}}
				>
					<Typography
						gutterBottom
						variant="h4"
						component="div"
						sx={{
							textAlign: "center",
						}}
					>
						Flights
					</Typography>
				</Box>
			</Box>
			<Box>
				<FlightOption />
			</Box>
			<Box>
				<FlightCard />
			</Box>
		</div>
	);
};

export default Flights;
