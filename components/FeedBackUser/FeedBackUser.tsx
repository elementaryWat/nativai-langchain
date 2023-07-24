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
  ScoreDescription,
  TextfieldButton,
} from "./styled";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ScoreIcon from "@mui/icons-material/Score";
import ChatIcon from "@mui/icons-material/Chat";
import { BsPencilFill } from "react-icons/bs";

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
        {/* <ThumbUpIcon /> */}
        <Typography sx={{
          fontWeight:"bold",
          fontSize:{xs:'1rem', md:'2rem'},
          color:"#000",
          textAlign:"center",
          margin:"1rem 0 ",
          '@media (max-width: 940px)': {
            margin:"1rem 0 ",
            fontSize:{xs:'1.8rem', md:'2rem'},
          },
        }} mb={4} variant="h4">
         👏👏👏
        </Typography>
        
        <Typography sx={{
          fontWeight:"bold",
          fontSize:{xs:'1rem', md:'2rem'},
          color:"#000",
          textAlign:"center",
          border:"10px solid #531757",
          borderRadius:"30px",
          // boxShadow: "0px 0px 60px 1px rgba(157, 55, 167, 0.55) inset",
          padding:".5rem 1rem",
          '@media (max-width: 940px)': {
            margin:"0 1rem"
          },
        }} mb={4} variant="h4">
          Bien hecho Augusto Romero!!
        </Typography>
        <Grid container sx={{
          backgroundColor:"#511854",
          // margin:"1rem 0",
          padding:".5rem 0",
          display:"flex",
          justifyContent:"space-evenly",
          maxWidth:"700px",
          borderRadius:"50px",
          '@media (max-width: 940px)': {
            borderRadius:"0",
            margin:"1rem 0",
          },
        }}>
          <Grid sx={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center"
          }} item>
            <ScoreIcon style={{ color: "#fff", fontSize:"50px"}} />
            <ScoreDescription>Intermediate Level</ScoreDescription>
          </Grid>
          <Grid sx={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center"
          }} item>
            <ChatIcon style={{ color: "#fff", fontSize:"50px" }}/>
            <ScoreDescription>1000 Words Used</ScoreDescription>
          </Grid>
        </Grid>
      </FeedbackSection>
      <FeedbackSection>
        <Typography sx={{
          fontWeight: "bold",
          fontSize: '1.7rem',
          textAlign:"center",
          padding:"0 0 ",
          '@media (max-width: 940px)': {
            fontSize: '1.1rem',
          },
        }} variant="h6">
          ¿Qué tan probable es que recomiende nuestra aplicación a un amigo o
          colega?
        </Typography>
        <Grid container flexDirection="row" justifyContent="space-around" sx={{
          backgroundColor:"#511854",
          padding:".5rem 0",
        }}>
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
        <TextfieldButton>
          <BsPencilFill/>
          Nos ayudas a mejorar....
        </TextfieldButton>
      </FeedbackSection>
      <FeedbackSection>
        <FeedbackButton onClick={redirectToTopicSelection}>
          Start another Conversation
        </FeedbackButton>
      </FeedbackSection>
    </FeedbackContainer>
  );
}
