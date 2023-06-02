import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { IconButton } from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { Message as MessageType } from "../../types/Message";
import { MessageBubble, MessageContainer } from "./styled";
import FeedbackPopover from "./FeedbackPopover";

const Message = ({ content, role, feedback, loadingFeedback }: MessageType) => {
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
        {loadingFeedback ? (
          <CircularProgress size={20} placeholder="Loading feedback" />
        ) : (
          feedback && (
            <>
              <IconButton
                aria-describedby={id}
                color="primary"
                onClick={handleClick}
              >
                <FeedbackIcon />
              </IconButton>
              <FeedbackPopover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                feedback={feedback}
              />
            </>
          )
        )}
      </MessageBubble>
    </MessageContainer>
  );
};

export default Message;
