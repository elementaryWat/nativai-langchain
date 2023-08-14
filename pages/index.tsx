import React, { useState } from "react";
import Stepperx from "../components/Stepperx/Stepper";
import Head from "next/head";
import LevelSelect from "../components/Onboarding/LevelSelect/LevelSelect";
import GettingStarted from "../components/Onboarding/GettingStarted/GettingStarted";
import { PageContainer } from "../components/Onboarding/styled";
import { useRouter } from "next/router";
import { useChat } from "../store/chatbot/useChat";
import TopicSelect from "../components/Onboarding/TopicSelect/TopicSelect";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { SignOut } from "../components/AuthComponent/SignOut";
import { addUserIfNotExists } from "../utils/firebaseFunctions";

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  // const { saveChatConfig } = useChat();
  const steps = ["Getting Started", "Name", "Level Select", "Topic Select"];
  const { data: session } = useSession();
  // useEffect(()=>{
  //   if (!session) {
  //       router.push('/login');
  //     }else{
  //       router.push('/')
  //     }
  // },[session])

  const {
    getInitialMessage,
    username,
    setUsername,
    levelConversation,
    topicConversation,
  } = useChat();

  useEffect(() => {
    if (session) {
      setUsername(session.user.name);
    }
  }, [session]);

  const goToChat = async () => {
    await getInitialMessage();
    router.push("/chat");
  };
  const nextHandlers = [null, null, goToChat];

  const stepComponents = [
    <GettingStarted />,
    // <NameInput />,
    <LevelSelect />,
    <TopicSelect />,
  ];

  useEffect(() => {
    if (session && session.user) {
      // Crear el objeto userData con los datos del usuario
      const userData = {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        chats: [], // Puedes inicializar el chat como un array vacío
      };

      // Llamar a la función para agregar el usuario a la colección "users"
      addUserIfNotExists(userData);
    }
  }, [session]);

  const isNextDisabled = () =>
    // (activeStep === 1 && username === "") ||
    (activeStep === 1 && levelConversation === "") ||
    (activeStep === 2 && topicConversation === "");

  return (
    <PageContainer background="linear-gradient(180deg, #6e45ff, black)">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SignOut />
      <Stepperx
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        stepComponents={stepComponents}
        nextHandlers={nextHandlers}
        isNextDisabled={isNextDisabled}
      />
    </PageContainer>
  );
};

export default OnboardingPage;
