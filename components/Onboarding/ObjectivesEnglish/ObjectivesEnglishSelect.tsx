import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { PageContainer, StyledRadioButton } from "../styled";
import styled from "styled-components";
import { useUserData } from "../../../store/user/useUserData";
import { OBJECTIVES, UserObjective } from "@/types/User";
import CareerIcon from "@mui/icons-material/BusinessCenter";
import TravelIcon from "@mui/icons-material/Flight";
import LanguageIcon from "@mui/icons-material/Language";
import CupIcon from "@mui/icons-material/EmojiEvents";
import ForumIcon from "@mui/icons-material/Forum";

const StyledTypographH4 = styled(Typography)`
  color: #000;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
  font-style: normal;
`;

const OBJECTIVE_ICONS = {
  TRAVEL: <TravelIcon />,
  CAREER: <CareerIcon />,
  CONVERSE: <LanguageIcon />,
  PERSONAL_GROWTH: <CupIcon />,
  OTHER: <ForumIcon />,
};

const ObjectiveSelect: React.FC = () => {
  const { objective: userObjective, setUserData } = useUserData();

  return (
    <PageContainer flexDirection="column" borderRadius="50px">
      <StyledTypographH4 color="#111" variant="h5" mb={2}>
        ¿Por qué quieres aprender inglés?
      </StyledTypographH4>
      <Grid
        container
        alignItems="center"
        justifyContent="space-evenly"
        flexDirection="column"
      >
        {Object.entries(OBJECTIVES).map(([key, description]) => (
          <StyledRadioButton
            key={key}
            onClick={() => setUserData({ objective: key as UserObjective })}
            selected={userObjective === key}
          >
            <Box width="100%">
              {OBJECTIVE_ICONS[key]}
              <Typography variant="body1">{description}</Typography>
            </Box>
          </StyledRadioButton>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default ObjectiveSelect;
