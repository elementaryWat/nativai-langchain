import React from "react";
import { MenuItem } from "@mui/material";
import {
  PageContainer,
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
} from "../styled";
import { useChat } from "../../../store/chatbot/useChat";

const LevelSelect: React.FC = () => {
  const { levelConversation, setLevelConversation } = useChat();

  const handleLevelChange = (event) => {
    const selectedLevel = event.target.value as string;
    setLevelConversation(selectedLevel);
  };

  return (
    <PageContainer>
      <StyledFormControl>
        <StyledInputLabel id="level">Choose your level</StyledInputLabel>
        <StyledSelect
          defaultValue=""
          labelId="level"
          value={levelConversation}
          onChange={handleLevelChange}
        >
          <MenuItem value="">Choose your English level</MenuItem>
          <MenuItem value={"B1"}>B1 - Intermediate</MenuItem>
          <MenuItem value={"B2"}>B2 - Upper intermediate</MenuItem>
          <MenuItem value={"C1"}>C1 - Advanced</MenuItem>
          <MenuItem value={"C2"}>C2 - Proficient</MenuItem>
        </StyledSelect>
      </StyledFormControl>
    </PageContainer>
  );
};

export default LevelSelect;
