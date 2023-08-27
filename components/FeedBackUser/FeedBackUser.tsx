import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
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
  StyledList,
  StyledListItem,
} from "./styled";
import ScoreIcon from "@mui/icons-material/Score";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import { updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { updateUsageStatistics } from "../../utils/userUsageUpdate";
import CoffeeIcon from "@mui/icons-material/Coffee";
import { ProModal } from "../ProModal/ProModal";
import { useUserData } from "../../store/user/useUserData";
import { addFeedbackIfNotExists } from "../../utils/firebaseFunctions";
import { requestFinalFeedback } from "@/utils/endpoints";
// import { BsPencilFill } from "react-icons/bs";

const labels = [
  { emoji: "😞", description: "Lo dudo mucho" },
  { emoji: "😐", description: "Neutral" },
  { emoji: "😍", description: "Muy probablemente" },
];

export default function FeedbackUser() {
  const [showCommentField, setShowCommentField] = useState(false);
  const [sendingComment, setSendingComment] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [topicsToReview, setTopicsToReview] = useState([]);
  const [commentSent, setCommentSent] = useState(false);
  const [rating, setRating] = useState(-1);
  const [comment, setComment] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [averageScore, setAverageScore] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const [showProModal, setShowProModal] = useState(false);

  const {
    chatId,
    messages,
    topicConversation,
    setChatId,
    setTopicConversation,
  } = useChat();

  const {
    email,
    username,
    level,
    coffees,
    chats,
    setUserData,
    decrementCoffees,
    isProMember,
    hasCoffeesRemaining,
  } = useUserData();

  useEffect(() => {
    if (messages.length > 0 && session) {
      generateFinalFeedback();
      trackStartEndChat(chatId, email, level, topicConversation, false);
    } else {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0 && session && isProMember) {
      let updatedChats = chats
        ? [
            ...chats,
            {
              id: chatId,
              messages,
            },
          ]
        : [
            {
              id: chatId,
              messages,
            },
          ];
      setUserData({
        chats: updatedChats,
      });
    }
  }, [messages, isProMember]);

  const startNewConversationHandler = () => {
    if (hasCoffeesRemaining) {
      setTopicConversation("");
      setRating(-1);
      setChatId(`chat-${new Date().toISOString()}`);
      router.replace("/");
    } else {
      setShowProModal(true);
    }
  };

  const continueConversationHandler = () => {
    if (hasCoffeesRemaining) {
      decrementCoffees();
      router.replace("/chat");
    } else {
      setShowProModal(true);
    }
  };

  const requestFinalFeedbackTips = async () => {
    setLoadingFeedback(true);
    const userMessages = messages.filter((message) => message.role === "user");
    const grammarFeedbacks = userMessages
      .map((message) => message.feedback?.grammar_feedback)
      .filter(Boolean);
    const vocabularyFeedbacks = userMessages
      .map((message) => message.feedback?.vocabulary_feedback)
      .filter(Boolean);

    const data = await requestFinalFeedback(
      grammarFeedbacks,
      vocabularyFeedbacks
    );

    setTopicsToReview(data.feedback.action_items);
    setLoadingFeedback(false);
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
    requestFinalFeedbackTips();
    updateUsageStatistics(
      session.user.email,
      wordsUsed.size,
      topicConversation
    );
  };

  const handleSubmitRecommendation = async (index: number) => {
    setRating(index);
    if (index !== -1) {
      let docRef = await addFeedbackIfNotExists(
        chatId,
        email,
        level,
        topicConversation
      );
      await updateDoc(docRef, {
        rating: index > 1 ? 5 : (index = 1 ? 3 : 1), //Change of scale for rating
        recommendationScore: index + 1,
      });
      trackFeedback(chatId, email, messages.length, index, comment);
    }
  };

  const sendComment = async () => {
    if (comment !== "") {
      setSendingComment(true);
      let docRef = await addFeedbackIfNotExists(
        chatId,
        email,
        level,
        topicConversation
      );
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
      <FeedbackSection>
        {loadingFeedback ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            <Typography style={{color:'#777',fontWeight:'bold'}} variant="h6" mb={2}>
              Temas para revisar:
            </Typography>
            <StyledList>
              {topicsToReview.map((topic, index) => (
                <StyledListItem style={{color:'#777',fontWeight:'bold',backgroundColor:'#e3f2fd',textAlign:'center'}} key={index}>{topic}</StyledListItem>
              ))}
            </StyledList>
          </>
        )}
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
        {!isProMember && (
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
            Cafés diarios restantes: {coffees >= 0 ? coffees : 0} <CoffeeIcon />
          </Typography>
        )}
        <FeedbackButton
          variant="contained"
          color="secondary"
          // onClick={redirectToTopicSelection}
          onClick={continueConversationHandler}
        >
          Continuar conversación
        </FeedbackButton>
        <FeedbackButton
          variant="contained"
          color="secondary"
          // onClick={redirectToTopicSelection}
          onClick={startNewConversationHandler}
        >
          Iniciar otra conversación
        </FeedbackButton>
      </FeedbackSection>
      <ProModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        userEmail={session?.user.email}
      />
    </FeedbackContainer>
  );
}
