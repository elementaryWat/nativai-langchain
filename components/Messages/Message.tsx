import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { IconButton } from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Info";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Message as MessageType } from "../../types/Message";
import { MessageBubble, MessageContainer } from "./styled";
// import PlayIcon from "@mui/icons-material/VolumeUp";
import EditIcon from "@mui/icons-material/EditNote";
import FeedbackPopover from "./FeedbackPopover";
import { trackOpenFeedbackMessage } from "../../utils/analyticsMethods";
// import { useSelector } from "react-redux";
// import { selectIsAudioPlaying } from "../../store/chatbot/selectors";

const Message = ({
  content,
  role,
  feedback,
  loadingFeedback,
  audioUrl,
  isLastMessageSent,
  handleResubmit,
}: MessageType & {
  isLastMessageSent: boolean;
  handleResubmit: (newMessage: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState(content);
  // const isAudioPlaying = useSelector(selectIsAudioPlaying);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    trackOpenFeedbackMessage(editedMessage, JSON.stringify(feedback));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMessage(e.target.value);
  };

  const handleConfirm = () => {
    setEditMode(false);
    handleResubmit(editedMessage);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedMessage(content);
  };

  // const handlePlayAudio = () => {
  //   if (audioUrl) {
  //     const audio = new Audio(audioUrl);
  //     audio.play();
  //   }
  // };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <MessageContainer role={role}>
      <MessageBubble role={role}>
        <>
          {editMode ? (
            <div>
              <TextField
                value={editedMessage}
                multiline
                onChange={handleChange}
                fullWidth
                autoFocus
              />
              <Button size="small" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="small" onClick={handleConfirm}>
                Confirm
              </Button>
            </div>
          ) : (
            <Grid container justifyContent="space-between">
              <Grid item flex={1} flexDirection="column">
                <Grid>{editedMessage}</Grid>
                {role === "user" && isLastMessageSent && (
                  <IconButton color="primary" onClick={() => setEditMode(true)}>
                    <EditIcon />
                  </IconButton>
                )}
              </Grid>
              <Grid item>
                {" "}
                {loadingFeedback ? (
                  <CircularProgress size={20} placeholder="Loading feedback" />
                ) : (
                  feedback && (
                    <>
                      <IconButton
                        aria-describedby={id}
                        color={
                          feedback.general_score >= 4 ? "success" : "warning"
                        }
                        onClick={handleClick}
                      >
                        {feedback.general_score >= 4 ? (
                          <TipsAndUpdatesIcon />
                        ) : (
                          <FeedbackIcon />
                        )}
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
              </Grid>
            </Grid>
          )}
        </>

        {/* {audioUrl && (
          <IconButton
            color="primary"
            onClick={handlePlayAudio}
            disabled={isAudioPlaying}
          >
            <PlayIcon />
          </IconButton>
        )} */}
      </MessageBubble>
    </MessageContainer>
  );
};

export default Message;
