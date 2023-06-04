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
  const { topicConversation, setTopicConversation } = useChat();

  const handleTopicChange = (event) => {
    const selectedTopic = event.target.value as string;
    setTopicConversation(selectedTopic);
  };

  return (
    <PageContainer>
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
