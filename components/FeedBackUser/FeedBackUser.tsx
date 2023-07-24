import React, { useState } from "react";
import { Typography, Box, IconButton, Icon, Grid } from "@mui/material";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../../utils/firebaseClient";
import { useChat } from "../../store/chatbot/useChat";
import {
  trackCloseFeedback,
  trackFeedback,
} from "../../utils/analyticsMethods";
import {
  EmojiButton,
  EmojiDescription,
  FeedbackButton,
  FeedbackContainer,
  FeedbackSection,
} from "./styled";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ScoreIcon from "@mui/icons-material/Score";
import ChatIcon from "@mui/icons-material/Chat";

const labels = [
  { emoji: "😞", description: "Lo dudo mucho" },
  { emoji: "😐", description: "Neutral" },
  { emoji: "😍", description: "Muy probablemente" },
];

export default function FeedbackUser() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { chatId, username, messages, levelConversation, topicConversation } =
    useChat();

  const handleClose = () => {
    trackCloseFeedback(chatId, username);
  };

  const handleEmojiClick = (index: number) => {
    setRating(index);
  };

  const redirectToTopicSelection = () => {
    // history.push("/topics");
    console.log("redirectToTopicSelection");
  };

  const handleSubmit = async () => {
    if (rating !== 0 && comment !== "") {
      const docRef = await addDoc(collection(db, "feedbacks"), {
        chatId,
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
    <FeedbackContainer>
      <FeedbackSection>
        <ThumbUpIcon />
        <Typography mb={4} variant="h4">
          Bien hecho Augusto Romero!!
        </Typography>
        <Grid container justifyContent="center" spacing={8}>
          <Grid item>
            <ScoreIcon />
            <EmojiDescription>Intermediate Level</EmojiDescription>
          </Grid>
          <Grid item>
            <ChatIcon />
            <EmojiDescription>1000 Words Used</EmojiDescription>
          </Grid>
        </Grid>
      </FeedbackSection>
      <FeedbackSection>
        <Typography variant="h6">
          ¿Qué tan probable es que recomiende nuestra aplicación a un amigo o
          colega?
        </Typography>
        <Grid container flexDirection="row" justifyContent="space-around">
          {labels.map((label, index) => (
            <Grid
              item
              display={"flex"}
              flexDirection="column"
              key={index}
              justifyContent="center"
              alignItems="center"
            >
              <EmojiButton onClick={() => handleEmojiClick(index)}>
                {label.emoji}
              </EmojiButton>
              <EmojiDescription>{label.description}</EmojiDescription>
            </Grid>
          ))}
        </Grid>
      </FeedbackSection>
      <FeedbackSection>
        <FeedbackButton onClick={redirectToTopicSelection}>
          Start another Conversation
        </FeedbackButton>
      </FeedbackSection>
    </FeedbackContainer>
  );
}
