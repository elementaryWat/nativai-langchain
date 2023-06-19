import React, { useState } from "react";
import Stepperx from "../components/Stepperx/Stepper";
import Head from "next/head";
import LevelSelect from "../components/Onboarding/LevelSelect/LevelSelect";
import GettingStarted from "../components/Onboarding/GettingStarted/GettingStarted";
import { PageContainer } from "../components/Onboarding/styled";
import { useRouter } from "next/router";
import { useChat } from "../store/chatbot/useChat";
import NameInput from "../components/Onboarding/NameInput/NameInput";
import TopicSelect from "../components/Onboarding/TopicSelect/TopicSelect";

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  // const { saveChatConfig } = useChat();
  const steps = ["Getting Started", "Name", "Level Select", "Topic Select"];
  const { getInitialMessage, username, levelConversation, topicConversation } =
    useChat();

  const goToChat = async () => {
    await getInitialMessage();
    router.push("/chat");
  };
  const nextHandlers = [null, null, null, goToChat];

  const stepComponents = [
    <GettingStarted />,
    <NameInput />,
    <LevelSelect />,
    <TopicSelect />,
  ];

  const isNextDisabled = () =>
    (activeStep === 1 && username === "") ||
    (activeStep === 2 && levelConversation === "") ||
    (activeStep === 3 && topicConversation === "");

  return (
    <PageContainer background="linear-gradient(180deg, #6e45ff, black)">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
