import React from "react";
import { Grid, Typography, Box} from "@mui/material";
import { PageContainer, StyledRadioButton } from "../styled";
import { useChat } from "../../../store/chatbot/useChat";
import styled from "styled-components";


const levelDescriptions = {
  "B1 - Intermediate": "Soy capaz de tener una conversación simple",
  "B2 - Upper intermediate":
    "Puedo mantener una conversación de temas variados con confianza",
  "C1 - Advanced":
    "Puedo expresar ideas y argumentos complejos con claridad y coherencia",
  "C2 - Proficient": "Manejo el idioma casi a la perfección",
};

const StyledTypographH4 = styled(Typography)`
  color: #fff; 
  margin-bottom: 1rem;
  text-align: center;
  background-color:#643453;
  padding:1rem 2rem;
  border-radius: 20px;
  font-weight: bold;
`;


  const LevelSelect: React.FC = () => {
  const { levelConversation, setLevelConversation } = useChat();

  return (
    <PageContainer flexDirection="column"  borderRadius='50px' >
      <StyledTypographH4 color="#111" variant="h5" mb={2}>
        Elige tu nivel
      </StyledTypographH4>
      <Grid container alignItems="center" justifyContent="center" flexDirection="column">
        {Object.keys(levelDescriptions).map((level) => (
          <StyledRadioButton  
            key={level}
            selected={levelConversation === level}
            onClick={() => setLevelConversation(level)}
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
