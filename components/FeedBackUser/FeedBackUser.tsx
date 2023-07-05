import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Rating,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../../utils/firebaseClient";
import { useChat } from "../../store/chatbot/useChat";
import { trackFeedback } from "../../utils/analyticsMethods";

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    padding: 20px;
  }
`;

const StyledRating = styled(Rating)`
  margin-top: 20px;
`;

const StyledTextField = styled(TextField)`
  margin-top: 20px;
`;

interface FeedbackModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function FeedbackDialog({ open, setOpen }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const { chatId, username, messages, levelConversation, topicConversation } =
    useChat();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (rating !== 0 && comment !== "" && email !== "") {
      setOpen(false);
      const docRef = await addDoc(collection(db, "feedbacks"), {
        chatId,
        email,
        username,
        levelConversation,
        topicConversation,
        messages,
        rating,
        comment,
      });
      trackFeedback(chatId, username, messages.length, rating, comment);

      console.log("Document written with ID: ", docRef.id);

      // Clear the state
      setRating(0);
      setComment("");
    }
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogTitle>Leave your feedback</DialogTitle>
      <DialogContent>
        <DialogContentText>Tell us how to improve</DialogContentText>
        <StyledRating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <StyledTextField
          required
          autoFocus
          multiline
          margin="dense"
          id="name"
          label="Comment"
          type="text"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <StyledTextField
          required
          margin="dense"
          id="name"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose}>Cancel</Button> */}
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </StyledDialog>
  );
}
