import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { PageContainer } from "../styled";
import styled from "styled-components";
import style from './GettingStarted.module.css'
import Image from "next/image";
import logo from '../../../asset/img/home_hero.png'

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
        height="100%"
        width="100%"
        borderRadius='20px'
        // bgcolor='#333'
      >
        <Image src={logo} alt="Logo"/>
        {/* <StyledTypography variant="h5" gutterBottom>
          Bienvenid@ a una plataforma única diseñada para ayudarte a mejorar tus
          habilidades en inglés.
        </StyledTypography> */}
        {/* <StyledTypography variant="h5" gutterBottom>
          ¡Empieza ahora y da un paso hacia el dominio del inglés!
        </StyledTypography> */}
        <Typography sx={{
          color:"#111",
          width:"100%",
          fontWeight:"bold",
          borderRadius:"20px",
          height:"30%",
          fontSize:"3rem",
          textAlign:"center",
          '@media (max-width: 768px)': {
            textAlign:"start"
          },
        }}  variant="h5" >
          ¡Empieza ahora!
        </Typography>
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
