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
import { SignOutButton } from "../components/AuthComponent/SignOut";
import { useUserData } from "../store/user/useUserData";
import AppBottomBar from "@/components/AppBottomBar";
import TopicPage from "./topics";

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  // const { saveChatConfig } = useChat();
  const steps = ["Getting Started", "Name", "Level Select", "Topic Select"];
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/login");
    }
    if (session && session.user) {
      fetchUserData(session.user.name, session.user.email, session.user.image);
    }
  }, [session]);

  const { getInitialMessage, topicConversation } = useChat();

  const {
    loadingStatus,
    level,
    username,
    hasCompletedOnboarding,
    fetchUserData,
    setUserData,
  } = useUserData();

  const lastStepOnboardingHandler = async () => {
    setUserData({ hasCompletedOnboarding: true });
    await getInitialMessage(username);
    router.push("/chat");
  };

  const nextHandlers = [null, lastStepOnboardingHandler];

  const stepComponents = [
    <GettingStarted />,
    // <NameInput />,
    <LevelSelect />,
  ];

  const isNextDisabled = () =>
    // (activeStep === 1 && username === "") ||
    (activeStep === 1 && level === "") ||
    (activeStep === 2 && topicConversation === "");

  return (
    <PageContainer background="linear-gradient(180deg, #6e45ff, black)">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SignOutButton />
      {hasCompletedOnboarding || loadingStatus === "loading" ? (
        <TopicPage />
      ) : (
        <Stepperx
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          stepComponents={stepComponents}
          nextHandlers={nextHandlers}
          isNextDisabled={isNextDisabled}
        />
      )}
    </PageContainer>
  );
};

export default OnboardingPage;
