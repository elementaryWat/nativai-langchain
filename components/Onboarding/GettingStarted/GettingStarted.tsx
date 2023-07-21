import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { PageContainer } from "../styled";
import styled from "styled-components";
import style from './GettingStarted.module.css'

// Define a StyledHeader component for the header
export const StyledHeader = styled(Box)`
  background-color: #6e45ff; // Set to your brand color
  color: white;
  padding: 1rem;
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;  
`;

const StyledTypography = styled(Typography)`
  color: #6e45ff; 
  margin-bottom: 1rem;
  background-color:#643453;
  padding:1rem 2rem;
  border-radius: 20px;
  color:#fff;

  &:hover{
    background-color:#b8b8b8;
    color:#643453;
  }
`;

const StyledTypographH2 = styled(Typography)`
  color: #fff; 
  margin-bottom: 1rem;
  text-align: center;
  background-color:#643453;
  padding:1rem 2rem;
  border-radius: 20px;
`;


const StyledTypographSpan = styled(Typography)`
  color: rgb(99, 137, 241);
`;

const GettingStarted: React.FC = () => {
  return (
    //Funciona con este 
    <PageContainer borderRadius='50px'>
      <Grid
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly" // Adjust alignment
        paddingY={5}
        height="100%"
        borderRadius='20px'
        // bgcolor='#643453'
      >
        <StyledTypographH2 variant="h2" gutterBottom  mb={8}>
          Nativ<StyledTypographSpan variant="span" mb={8}>AI</StyledTypographSpan>
        </StyledTypographH2>
        {/* <StyledTypography variant="h5" gutterBottom>
          Bienvenid@ a una plataforma única diseñada para ayudarte a mejorar tus
          habilidades en inglés.
        </StyledTypography> */}
        {/* <StyledTypography variant="h5" gutterBottom>
          ¡Empieza ahora y da un paso hacia el dominio del inglés!
        </StyledTypography> */}
        <StyledTypography variant="h5" gutterBottom>
          ¡Empieza ahora!
        </StyledTypography>
      </Grid>
    </PageContainer>
    //No funciona con este 
    // <PageContainer>
    //   <div>
    //     <h2>
    //       Nativ<span className={style.span_gatting_started}>AI</span>
    //     </h2>
    //     <h5>
    //       Bienvenid@ a una plataforma única diseñada para ayudarte a mejorar tus
    //       habilidades en inglés.
    //     </h5>
    //     <h5>
    //       ¡Empieza ahora y da un paso hacia el dominio del inglés!
    //     </h5>
    //   </div>
    // </PageContainer>
  );
};

export default GettingStarted;
