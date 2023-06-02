import React from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import {
  PageContainer,
  StyledButton,
  StyledFormControl,
  Title,
} from "./styled";
import { useChat } from "../../store/chatbot/useChat";

const LevelSelect: React.FC = () => {
  const router = useRouter();
  const { levelConversation, setLevelConversation } = useChat();

  const handleLevelChange = (event) => {
    const selectedLevel = event.target.value as string;
    setLevelConversation(selectedLevel);
  };

  return (
    <PageContainer>
      <Title>Choose your English level</Title>
      <StyledFormControl variant="standard">
        <InputLabel id="level">Level</InputLabel>
        <Select
          labelId="level"
          id="select-level"
          value={levelConversation}
          onChange={handleLevelChange}
          label="Level"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"B1"}>B1 - Intermediate</MenuItem>
          <MenuItem value={"B2"}>B2 - Upper intermediate</MenuItem>
          <MenuItem value={"C1"}>C1 - Advanced</MenuItem>
          <MenuItem value={"C2"}>C2 - Proficient</MenuItem>
        </Select>
        {levelConversation && (
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => router.push("/chat")}
          >
            Start Conversation
          </StyledButton>
        )}
      </StyledFormControl>
    </PageContainer>
  );
};

export default LevelSelect;
