import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { PageContainer, StyledRadioButton } from "../styled";
import { useChat } from "../../../store/chatbot/useChat";

const levelDescriptions = {
  "B1 - Intermediate": "Soy capaz de tener una conversación simple",
  "B2 - Upper intermediate":
    "Puedo mantener una conversación de temas variados con confianza",
  "C1 - Advanced":
    "Puedo expresar ideas y argumentos complejos con claridad y coherencia",
  "C2 - Proficient": "Manejo el idioma casi a la perfección",
};

const LevelSelect: React.FC = () => {
  const { levelConversation, setLevelConversation } = useChat();

  return (
    <PageContainer>
      <Typography variant="h4" mb={2}>
        Elige tu nivel
      </Typography>
      <Grid container flexDirection="column">
        {Object.keys(levelDescriptions).map((level) => (
          <StyledRadioButton
            key={level}
            selected={levelConversation === level}
            onClick={() => setLevelConversation(level)}
          >
            <Box>
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
