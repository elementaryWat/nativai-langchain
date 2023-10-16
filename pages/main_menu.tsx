import { SignOutButton } from "@/components/AuthComponent/SignOut";
import { StyledRadioButtonTopic } from "@/components/Onboarding/styled";
import FondoPerfil from "@/components/ProfileComponent/FondoPerfil/FondoPerfil";
import TopicSelection from "@/components/TopicSelection";
import BtnNewChat from "@/components/menu_main/btnNewChat";
import { useUserData } from "@/store/user/useUserData";
import styled from "@emotion/styled";
import { Grid, Container, Typography, Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getChats } from "@/utils/firebaseFunctions";
// import { getFeedback } from "@/utils/firebaseFunctions";

const CardChat = styled(Box)`
width: 90%;
height: 50px;
background-color: #fff;
margin-bottom: 1rem;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 1rem;
border-radius: 10px;
box-shadow: 0px 4px 4px rgba(0; 0; 0; 0.25);
font-size: 12px;
font-weight: 600;
font-style: normal;
line-height: 22px;
`;

const StyledFlex = styled(Grid)`
  width: 100%;
  height: 100%;
  padding: 1rem 0rem;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  border-radius: 10px;
  // align-items: stretch;
  justify-content: stretch;
  // justify-content: center;
  align-items: center;
  background-color: #9d37a7;
`;

function obtenerFecha(cadena: string): string | null {
  const fechaCoincidencia = cadena.match(/chat-(\d{4}-\d{2}-\d{2})/);

  if (fechaCoincidencia && fechaCoincidencia[1]) {
    return fechaCoincidencia[1];
  } else {
    return null;
  }
}

export default function MainMenu() {
  const router = useRouter();
  const { status: statusSession } = useSession();
  const { hasCompletedOnboarding, loadingStatus } = useUserData();
  const [userChats, setUserChats] = useState([]);
  const { username, email, emailMP } = useUserData();

  useEffect(() => {
    // Llama a la función getChats para obtener los chats del usuario
    getChats(email).then((chats) => {
      setUserChats(chats);
    });
  }, [email]);


  useEffect(() => {
    if (statusSession === "unauthenticated") {
      router.replace("/login");
    }
  }, [statusSession]);
  useEffect(() => {
    if (loadingStatus !== "loading") {
      if (!hasCompletedOnboarding) {
        router.replace("/getting-started");
      }
    }
  }, [hasCompletedOnboarding, loadingStatus]);

  return (
    <Grid container width="100%">
      <SignOutButton />
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          width: "100%",
          backgroundColor: "transparent",
          padding: "2rem 1rem",
          zIndex: 1000,
          position: "relative",
        }}
      >
        <StyledFlex container>
          <Typography
            variant="h4"
            component="h4"
            style={{
              color: "#fff",
              textAlign: "center",
              marginBottom: "2rem",
              fontWeight: 600,
              fontSize: "34px",
              fontStyle: "normal",
              lineHeight: "22px",
            }}
          >
            Conversaciones
          </Typography>
          {userChats.map((chat) => {
            const fecha = obtenerFecha(chat.chatId);
            return (
              <CardChat>
                <p>{chat.topicConversation}</p>
                <p>{fecha}</p>
              </CardChat>
            );
          })}
        </StyledFlex>
        <BtnNewChat onClick={() => {
          router.push("/");
        }} />
      </Container>
    </Grid>
  );
}
