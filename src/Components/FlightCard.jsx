import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import flightIcon from "../assets/flight-ticket.png";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
// const flights = [
//   {
//     label: "San Francisco – Oakland Bay Bridge, United States",
//     flight_from: "Kol",
//     flight_to: "London",
//     Date: "22/04/2022",
//     cost: 2000,
//     from: "7 PM",
//     to: "9 PM",
//     time: "1 hr 50 mins",
//     imgPath:
//       "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=40&h=40&q=60",
//   },
//   {
//     label: "Bird",
//     flight_from: "Kol",
//     flight_to: "London",
//     Date: "22/04/2022",
//     cost: 2000,
//     from: "7 PM",
//     to: "9 PM",
//     time: "1 hr 50 mins",
//     imgPath:
//       "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=40&h=40&q=60",
//   },
//   {
//     label: "Bali, Indonesia",
//     flight_from: "Kol",
//     flight_to: "London",
//     Date: "22/04/2022",
//     cost: 2000,
//     from: "7 PM",
//     to: "9 PM",
//     time: "1 hr 50 mins",
//     imgPath:
//       "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=40&h=40&q=80",
//   },
//   {
//     label: "Goč, Serbia",
//     flight_from: "Kol",
//     flight_to: "London",
//     Date: "22/04/2022",
//     cost: 2000,
//     from: "7 PM",
//     to: "9 PM",
//     time: "1 hr 50 mins",
//     imgPath:
//       "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=40&h=40&q=60",
//   },
// ];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FlightCard(props) {
  const theme = useTheme();
  const flights = props.flights;
  return (
    <Box sx={{ backgroundColor: "black" }}>
      {flights.map((flight) => {
        return (
          <Paper
            sx={{
              p: 2,
              margin: "auto",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              paddingBottom: 2,
              borderRadius: "5%",
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 60, height: 60 }}>
                  <Img alt="complex" src={flightIcon} />
                </ButtonBase>
              </Grid>
              <Grid item xs>
                <Typography component="div" variant="h6">
                  {flight.from} - {flight.to}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  alignItems="center"
                >
                  {flight.time}
                </Typography>
              </Grid>
              <Grid item xs sx={{ alignItems: "right", justifyContent:"end" }}>
                <Typography sx={{ right: "0%" }}>Rs. {flight.cost}</Typography>
                <Button variant="contained">Book Now</Button>
              </Grid>
            </Grid>
          </Paper>
        );
      })}
    </Box>
  );
}
