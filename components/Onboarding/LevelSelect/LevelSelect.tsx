import React from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import {
  PageContainer,
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
} from "../styled";
import { useChat } from "../../../store/chatbot/useChat";

const LevelSelect: React.FC = () => {
  const router = useRouter();
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

      {/* {levelConversation && (
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => router.push("/chat")}
          >
            Start Conversation
          </StyledButton>
        )} */}
    </PageContainer>
  );
};

export default LevelSelect;
