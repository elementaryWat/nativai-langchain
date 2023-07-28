import React, { useEffect, useState } from "react";
import { Typography, Grid, Button, Chip } from "@mui/material";
import { useChat } from "../../store/chatbot/useChat";
import { trackFeedback, trackStartEndChat } from "../../utils/analyticsMethods";
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
  FeedbackSectionCommet,
} from "./styled";
import ScoreIcon from "@mui/icons-material/Score";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import { SCORE_FEEDBACK_VALUE } from "../../types/Message";
import { useRouter } from "next/router";
import { LENGTH_FEEDBACK } from "../../utils/const";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
// import { BsPencilFill } from "react-icons/bs";

const labels = [
  { emoji: "😞", description: "Lo dudo mucho" },
  { emoji: "😐", description: "Neutral" },
  { emoji: "😍", description: "Muy probablemente" },
];

export default function FeedbackUser() {
  const [showCommentField, setShowCommentField] = useState(false);
  const [sendingComment, setSendingComment] = useState(false);
  const [commentSent, setCommentSent] = useState(false);
  const [rating, setRating] = useState(-1);
  const [comment, setComment] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [averageScore, setAverageScore] = useState("");
  const router = useRouter();

  const {
    chatId,
    username,
    messages,
    levelConversation,
    topicConversation,
    setTopicConversation,
  } = useChat();

  useEffect(() => {
    if (messages.length > 0) generateFinalFeedback();
    if (messages.length === LENGTH_FEEDBACK) {
      trackStartEndChat(
        chatId,
        username,
        levelConversation,
        topicConversation,
        false
      );
    }
  }, [messages]);

  const redirectToTopicSelection = () => {
    setTopicConversation("");
    setRating(-1);
    router.replace("/topics");
    // console.log("redirectToTopicSelection");
  };

  const generateFinalFeedback = () => {
    let totalScore = 0;
    let totalUserMessages = 0;
    let wordsUsed: Set<string> = new Set();

    messages.forEach((message) => {
      if (message.role === "user") {
        if (message.feedback) {
          totalScore += message.feedback.general_score;
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
    if (avgScore >= 4) {
      finalScore = "Advanced";
    } else if (avgScore >= 2.5) {
      finalScore = "Intermediate";
    }

    setWordCount(wordsUsed.size);
    setAverageScore(finalScore);
  };

  const addFirebaseDocIdNotExists = async () => {
    const db = getFirestore();
    const chatFeedBackRef = doc(db, "feedbacks", chatId);
    const chatFeedbackSnapshot = await getDoc(chatFeedBackRef);
    if (!chatFeedbackSnapshot.exists()) {
      await setDoc(chatFeedBackRef, {
        chatId,
        username,
        levelConversation,
        topicConversation,
        messages,
      });
    }
    return chatFeedBackRef;
  };

  const handleSubmitRecommendation = async (index: number) => {
    setRating(index);
    if (index !== -1) {
      let docRef = await addFirebaseDocIdNotExists();
      await updateDoc(docRef, {
        recommendationScore: index,
      });
      trackFeedback(chatId, username, messages.length, index, comment);
    }
  };

  const sendComment = async () => {
    if (comment !== "") {
      setSendingComment(true);
      let docRef = await addFirebaseDocIdNotExists();
      await updateDoc(docRef, {
        comment,
      });
      setSendingComment(false);
      setComment("");
      setCommentSent(true);
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
          Bien hecho {username}!!
        </Typography>
        <Grid
          container
          sx={{
            backgroundColor: "primary.dark",
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
            <ScoreDescription>{averageScore} Level</ScoreDescription>
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
      <FeedbackSectionCommet>
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
            backgroundColor: "primary.dark",
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
                onClick={async () => await handleSubmitRecommendation(index)}
                style={{
                  backgroundColor: index === rating ? "grey" : "",
                  borderRadius: 12,
                }}
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
                disabled={sendingComment}
                onClick={sendComment}
                startIcon={<SendIcon />}
              >
                Enviar
              </StyledButton>
              {commentSent && (
                <Chip
                  label="Muchas gracias por tu sugerencia!"
                  color="primary"
                  onDelete={() => setCommentSent(false)}
                />
              )}
            </>
          )}
        </TellMoreWrapper>
      </FeedbackSectionCommet>
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
