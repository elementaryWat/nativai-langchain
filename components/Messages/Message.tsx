import { Box } from "@mui/material";
import { useState } from "react";
import styled from "@emotion/styled";
import { IconButton, Popover, Typography } from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { Message as MessageType } from "../../types/Message";

const MessageBubble = styled(Box)(
  ({ role }: { role: "user" | "system" | "assistant" }) => ({
    justifyContent: "space-between",
    background: role === "user" ? "#4caf50" : "#f1f1f1",
    padding: "10px 20px",
    borderRadius: "20px",
    color: role === "user" ? "white" : "black",
    marginBottom: "10px",
    width: "80%",
  })
);

const MessageContainer = styled(Box)(
  ({ role }: { role: "user" | "system" | "assistant" }) => ({
    display: "flex",
    justifyContent: role === "user" ? "flex-end" : "flex-start",
    width: "100%",
  })
);

const Message = ({ content, role, feedback }: MessageType) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <MessageContainer role={role}>
      <MessageBubble role={role}>
        {content}
        {feedback && (
          <>
            <IconButton
              aria-describedby={id}
              color="primary"
              onClick={handleClick}
            >
              <FeedbackIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography sx={{ p: 2 }}>
                Feedback: {feedback.feedback}
                Score: {feedback.score}
              </Typography>
            </Popover>
          </>
        )}
      </MessageBubble>
    </MessageContainer>
  );
};

export default Message;
