import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { PageContainer, StyledRadioButton } from "../styled";
import { useChat } from "../../../store/chatbot/useChat";
import styled from "styled-components";
import { useUserData } from "../../../store/user/useUserData";

const levelDescriptions = {
  "B1 - Intermediate": "Soy capaz de tener una conversación simple",
  "B2 - Upper intermediate":
    "Puedo mantener una conversación de temas variados con confianza",
  "C1 - Advanced":
    "Puedo expresar ideas y argumentos complejos con claridad y coherencia",
  "C2 - Proficient": "Manejo el idioma casi a la perfección",
};

const StyledTypographH4 = styled(Typography)`
  color: #000;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
  font-size: 34px;
  font-style: normal;
  line-height: 22px;
`;

const LevelSelect: React.FC = () => {
  const { level: levelConversation, setUserData } = useUserData();

  return (
    <PageContainer flexDirection="column" borderRadius="50px">
      <StyledTypographH4 color="#111" variant="h5" mb={2}>
        Elige tu nivel
      </StyledTypographH4>
      <Grid
        container
        alignItems="center"
        justifyContent="space-evenly"
        flexDirection="column"
      >
        {Object.keys(levelDescriptions).map((level) => (
          <StyledRadioButton
            key={level}
            onClick={() => setUserData({ level })}
            selected={levelConversation === level}
          >
            <Box width="100%">
              <Typography variant="body1">{level}</Typography>
              <Typography
                variant="subtitle2"
                fontStyle="italic"
                textTransform="none"
              >
                {levelDescriptions[level]}
              </Typography>
            </Box>
          </StyledRadioButton>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default LevelSelect;
