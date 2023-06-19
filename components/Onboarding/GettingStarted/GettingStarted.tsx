import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { PageContainer } from "../styled";
import styled from "styled-components";

// Define a StyledHeader component for the header
export const StyledHeader = styled(Box)`
  background-color: #6e45ff; // Set to your brand color
  color: white;
  padding: 1rem;
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
`;

const GettingStarted: React.FC = () => {
  return (
    <PageContainer>
      <Grid
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-end" // Adjust alignment
        paddingY={5}
        height="100%"
      >
        <Typography variant="h2" gutterBottom color={"#6e45ff"} mb={8}>
          NativAI
        </Typography>
        <Typography variant="h5" gutterBottom>
          Bienvend@ a una plataforma única diseñada para ayudarte a mejorar tus
          habilidades en inglés.
        </Typography>
        <Typography variant="h5" gutterBottom>
          ¡Empieza ahora y da un paso hacia el dominio del inglés!
        </Typography>
      </Grid>
    </PageContainer>
  );
};

export default GettingStarted;
