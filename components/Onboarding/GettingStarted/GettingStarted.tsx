import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { PageContainer } from "../styled";

const GettingStarted: React.FC = () => {
  return (
    <Grid
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-end"
      paddingY={5}
      height="100%"
    >
      <Typography variant="h2" gutterBottom color={"#6e45ff"}>
        Your
      </Typography>
      <Typography variant="h2" gutterBottom>
        Native
      </Typography>
      <Typography variant="h2" gutterBottom color={"#6e45ff"}>
        Friend
      </Typography>
    </Grid>
  );
};

export default GettingStarted;
