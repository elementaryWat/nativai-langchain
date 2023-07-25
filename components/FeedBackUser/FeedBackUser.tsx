import React, { useEffect, useState } from "react";
import { Typography, Grid, Button } from "@mui/material";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../../utils/firebaseClient";
import { useChat } from "../../store/chatbot/useChat";
import {
  trackCloseFeedback,
  trackFeedback,
  trackStartEndChat,
} from "../../utils/analyticsMethods";
import {
  EmojiButton,
  EmojiDescription,
  FeedbackButton,
  FeedbackContainer,
  FeedbackSection,
  ScoreDescription,
  StyledButton,
  StyledTextField,
  TellMoreWrapper,
} from "./styled";
import ScoreIcon from "@mui/icons-material/Score";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import { SCORE_FEEDBACK_VALUE } from "../../types/Message";
// import { BsPencilFill } from "react-icons/bs";

const labels = [
  { emoji: "😞", description: "Lo dudo mucho" },
  { emoji: "😐", description: "Neutral" },
  { emoji: "😍", description: "Muy probablemente" },
];

export default function FeedbackUser() {
  const [showCommentField, setShowCommentField] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [averageScore, setAverageScore] = useState("");

  const { chatId, username, messages, levelConversation, topicConversation } =
    useChat();

  useEffect(() => {
    if (messages.length > 0) generateFinalFeedback();
    if (messages.length === 3) {
      trackStartEndChat(
        chatId,
        username,
        levelConversation,
        topicConversation,
        false
      );
    }
  }, [messages]);

  const handleEmojiClick = (index: number) => {
    setRating(index);
  };

  const redirectToTopicSelection = () => {
    // history.push("/topics");
    console.log("redirectToTopicSelection");
  };

  const generateFinalFeedback = () => {
    let totalScore = 0;
    let totalUserMessages = 0;
    let wordsUsed: Set<string> = new Set();

    messages.forEach((message) => {
      if (message.role === "user") {
        if (message.feedback) {
          totalScore += SCORE_FEEDBACK_VALUE[message.feedback.score];
          totalUserMessages += 1;
        }

        // Add words to the dictionary
        message.content.split(" ").forEach((word) => {
          wordsUsed.add(word);
        });
      }
    });

    const avgScore = totalUserMessages > 0 ? totalScore / totalUserMessages : 0;
    let finalScore: "Basic" | "Intermediate" | "Advanced" = "Basic";

    // Convert numeric score back to string value
    if (avgScore >= 2.5) {
      finalScore = "Advanced";
    } else if (avgScore >= 1.5) {
      finalScore = "Intermediate";
    }

    setWordCount(wordsUsed.size);
    setAverageScore(finalScore);
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
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1rem", md: "2rem" },
            color: "#000",
            textAlign: "center",
            margin: "1rem 0 ",
            "@media (max-width: 940px)": {
              margin: "1rem 0 ",
              fontSize: { xs: "1.8rem", md: "2rem" },
            },
          }}
          mb={4}
          variant="h4"
        >
          👏👏👏
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.25rem", md: "2rem" },
            color: "#000",
            textAlign: "center",
            // border: "10px solid #531757",
            borderRadius: "30px",
            // boxShadow: "0px 0px 60px 1px rgba(157, 55, 167, 0.55) inset",
            padding: ".5rem 1rem",
            "@media (max-width: 940px)": {
              margin: "0 1rem",
            },
          }}
          mb={4}
          variant="h4"
        >
          Bien hecho Augusto Romero!!
        </Typography>
        <Grid
          container
          sx={{
            backgroundColor: "#511854",
            // margin:"1rem 0",
            padding: ".5rem 0",
            display: "flex",
            justifyContent: "space-evenly",
            maxWidth: "700px",
            borderRadius: "50px",
            "@media (max-width: 940px)": {
              borderRadius: "0",
              margin: "1rem 0",
            },
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            item
          >
            <ScoreIcon style={{ color: "#fff", fontSize: "50px" }} />
            <ScoreDescription>{averageScore} Nivel</ScoreDescription>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            item
          >
            <ChatIcon style={{ color: "#fff", fontSize: "50px" }} />
            <ScoreDescription>{wordCount} palabras usadas</ScoreDescription>
          </Grid>
        </Grid>
      </FeedbackSection>
      <FeedbackSection>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "0.75", md: "1.5rem" },
            textAlign: "center",
            padding: "0 0 ",
            "@media (max-width: 940px)": {
              fontSize: "1.1rem",
            },
          }}
          variant="h6"
        >
          ¿Qué tan probable es que recomiende nuestra aplicación a un amigo o
          colega?
        </Typography>
        <Grid
          container
          flexDirection="row"
          justifyContent="space-around"
          sx={{
            backgroundColor: "#511854",
            padding: ".5rem 0",
          }}
        >
          {labels.map((label, index) => (
            <Grid
              item
              display={"flex"}
              flexDirection="column"
              key={index}
              justifyContent="center"
              alignItems="center"
            >
              <EmojiButton
                onClick={() => handleEmojiClick(index)}
                style={{ backgroundColor: index === rating ? "grey" : "" }}
              >
                {label.emoji}
              </EmojiButton>
              <EmojiDescription>{label.description}</EmojiDescription>
            </Grid>
          ))}
        </Grid>
        <TellMoreWrapper>
          <Button
            variant="text"
            color="secondary"
            onClick={() => setShowCommentField(!showCommentField)}
            startIcon={<EditIcon />}
          >
            Cuentanos más
          </Button>

          {showCommentField && (
            <>
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
              <StyledButton
                variant="text"
                color="secondary"
                onClick={() => {
                  // Here, add your function to handle the comment submission
                  console.log("Feedback sent");
                }}
                startIcon={<SendIcon />}
              >
                Enviar
              </StyledButton>
            </>
          )}
        </TellMoreWrapper>
      </FeedbackSection>
      <FeedbackSection>
        <FeedbackButton
          variant="contained"
          color="secondary"
          onClick={redirectToTopicSelection}
        >
          Iniciar otra conversación
        </FeedbackButton>
      </FeedbackSection>
    </FeedbackContainer>
  );
}
