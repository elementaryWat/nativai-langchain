import React, { useState } from "react";
import Stepperx from "../components/Stepperx/Stepper";
import LevelSelect from "../components/Onboarding/LevelSelect/LevelSelect";
import GettingStarted from "../components/Onboarding/GettingStarted/GettingStarted";
import { PageContainer } from "../components/Onboarding/styled";
import { useRouter } from "next/router";
import { useChat } from "../store/chatbot/useChat";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUserData } from "../store/user/useUserData";

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
  }, [session]);

  const { topicConversation } = useChat();

  const { level, setUserData } = useUserData();

  const lastStepOnboardingHandler = async () => {
    setUserData({ hasCompletedOnboarding: true });
    router.push("/");
  };

  const nextHandlers = [null, lastStepOnboardingHandler];

  const stepComponents = [<GettingStarted />, <LevelSelect />];

  const isNextDisabled = () =>
    (activeStep === 1 && level === "") ||
    (activeStep === 2 && topicConversation === "");

  return (
    <PageContainer background="linear-gradient(180deg, #6e45ff, black)">
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
