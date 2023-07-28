import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import styled from "styled-components";
import TopicSelect from "../components/Onboarding/TopicSelect/TopicSelect";
import { useChat } from "../store/chatbot/useChat";
import { useRouter } from "next/router";

const StyledButton = styled(Button)`
  padding: 1rem;
  border-radius: 30px;
`;

const TopicPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { topicConversation, getInitialMessage } = useChat();

  const goToChat = async () => {
    setLoading(true);
    await getInitialMessage();
    setLoading(false);
    router.push("/chat");
  };

  return (
    <Grid
      container
      py={4}
      height="calc(var(--vh, 1vh) * 95)"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      flexWrap="nowrap"
    >
      <Grid>
        <TopicSelect />
      </Grid>
      <Grid>
        <StyledButton
          disabled={topicConversation === ""}
          onClick={goToChat}
          color="primary"
          variant="contained"
        >
          Iniciar conversación
        </StyledButton>
      </Grid>
    </Grid>
  );
};

export default TopicPage;
