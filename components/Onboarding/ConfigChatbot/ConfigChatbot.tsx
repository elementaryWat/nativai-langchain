import React from "react";
import { MenuItem } from "@mui/material";
import {
  PageContainer,
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
} from "../styled";
import { useChat } from "../../../store/chatbot/useChat";
import { TOPICS } from "../../../utils/const";

const TopicSelect: React.FC = () => {
  const {
    topicConversation,
    setTopicConversation,
    levelConversation,
    setLevelConversation,
  } = useChat();

  const handleTopicChange = (event) => {
    const selectedTopic = event.target.value as string;
    setTopicConversation(selectedTopic);
  };

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
      <StyledFormControl>
        <StyledInputLabel id="level">Choose a topic</StyledInputLabel>
        <StyledSelect
          value={topicConversation}
          onChange={handleTopicChange}
          defaultValue=""
          placeholder="Choose a topic"
        >
          <MenuItem value="">Choose a topic for conversation</MenuItem>
          {Object.keys(TOPICS).map((topicKey) => (
            <MenuItem key={topicKey} value={topicKey}>
              {TOPICS[topicKey]}
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </PageContainer>
  );
};

export default TopicSelect;
