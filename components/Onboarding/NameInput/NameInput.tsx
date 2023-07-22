import React from "react";
import { PageContainer, StyledTextField } from "../styled";
import { useChat } from "../../../store/chatbot/useChat";

const NameInput: React.FC = () => {
  const { username, setUsername } = useChat();

  return (
    <PageContainer flexDirection="column"  borderRadius='50px' >
      <StyledTextField
        id="name"
        label="Your name"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
    </PageContainer>
  );
};

export default NameInput;
