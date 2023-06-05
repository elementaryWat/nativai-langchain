import React, { useState } from "react";
import Stepperx from "../components/Stepperx/Stepper";
import Head from "next/head";
import TopicSelect from "../components/Onboarding/ConfigChatbot/ConfigChatbot";
import GettingStarted from "../components/Onboarding/GettingStarted/GettingStarted";
import { PageContainer } from "../components/Onboarding/styled";
import { useRouter } from "next/router";
import { useChat } from "../store/chatbot/useChat";
import NameInput from "../components/Onboarding/NameInput/NameInput";

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  // const { saveChatConfig } = useChat();
  const steps = ["Getting Started", "Level Select", "Topic Select"];
  const { getInitialMessage, username, levelConversation, topicConversation } =
    useChat();

  const goToChat = async () => {
    await getInitialMessage();
    router.push("/chat");
  };
  const nextHandlers = [null, null, goToChat];

  const stepComponents = [<GettingStarted />, <NameInput />, <TopicSelect />];

  const isNextDisabled = () =>
    (activeStep === 1 && username === "") ||
    (activeStep === 2 &&
      (levelConversation === "" || topicConversation === ""));

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
