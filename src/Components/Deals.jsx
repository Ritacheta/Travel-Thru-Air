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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const flights = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    flight_from: "Kol",
    flight_to: "London",
    Date: "22/04/2022",
    cost: 2000,
    imgPath: "https://source.unsplash.com/random/300x300?",
  },
  {
    label: "Bird",
    flight_from: "Kol",
    flight_to: "London",
    Date: "22/04/2022",
    cost: 2000,
    imgPath: "https://source.unsplash.com/random/300x300",
  },
  {
    label: "Bali, Indonesia",
    flight_from: "Kol",
    flight_to: "Kolkata",
    Date: "22/04/2022",
    cost: 2000,
    imgPath: "https://source.unsplash.com/random/300x300",
  },
  {
    label: "Goč, Serbia",
    flight_from: "Kol",
    flight_to: "London",
    Date: "22/04/2022",
    cost: 2000,
    imgPath: "https://source.unsplash.com/random/300x300",
  },
];

function Deals() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = flights.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect = () => {
    //console.log("abbs");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        maxWidth: "100vw",
        flexFlow: 1,
        flexDirection: "row",
      }}
    >
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {flights.map((step, index) => (
          <div key={step.label} className="deals">
            {Math.abs(activeStep - index) <= 2 ? (
              <div
                className="Deals-image"
                style={{
                  backgroundImage: `url('https://source.unsplash.com/random/300x300?${step.flight_to}')`,
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
                    // backgroundImage: `url(${step.imgPath})`,
                    // backgroundSize: "cover",
                    // color: "black",
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
                        {step.flight_from}
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
                        {step.flight_to}
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
                      <Typography variant="h2" sx={{ color: "blue" }}>
                        Rs. {step.cost}
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
                      <Typography variant="h2" sx={{ color: "blue" }}>
                        On {step.Date}
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
                      <Button variant="contained">Let's Go</Button>
                    </Box>
                  </div>
                  {/* <MobileStepper
                    steps={maxSteps}
                    position="absolute"
                    activeStep={activeStep}
                    sx={{
                      bottom: 0,
                      position: "absolute",
                      width: "100%",
                      background: "transperant",
                    }}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                      >
                        Next
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  /> */}
                </Box>
              </div>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
}

export default Deals;
