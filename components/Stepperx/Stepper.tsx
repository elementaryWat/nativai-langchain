import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { Backdrop, Typography } from "@mui/material";

interface StepperxProps {
  steps: string[];
  stepComponents: React.ReactNode[];
  activeStep: number;
  setActiveStep: (currentStep: number) => void;
  nextHandlers?: (((stepIndex: number) => Promise<void>) | null)[];
  isNextDisabled: () => boolean;
}

const Loading: React.FC = () => {
  return (
    <Backdrop
      open={true}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6">Setting up...</Typography>
      </Box>
    </Backdrop>
  );
};

const Stepperx: React.FC<StepperxProps> = ({
  steps,
  stepComponents,
  activeStep,
  setActiveStep,
  nextHandlers,
  isNextDisabled,
}) => {
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  const handleNext = async () => {
    const customHandleNext = nextHandlers && nextHandlers[activeStep];
    if (customHandleNext) {
      setLoading(true);
      await customHandleNext(activeStep);
      setLoading(false);
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step: number) => {
    return stepComponents[step] || <Loading />;
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "calc(var(--vh, 1vh) * 90)",
        // height: "95vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor:"#9d37a7"
      }}
    >
      <Box sx={{ flex: "1 0 auto" }}>{getStepContent(activeStep)}</Box>
      <MobileStepper
        variant="dots"
        steps={steps.length}
        position="static"
        activeStep={activeStep}
        sx={{ backgroundColor: "transparent" }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={
              (activeStep === steps.length - 1 && !handleNext) ||
              isNextDisabled()
            }
          >
            {loading ? <CircularProgress size={24} /> : "Next"}
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Container>
  );
};

export default Stepperx;
