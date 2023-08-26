import React, { useState } from "react";
import Stepperx from "../components/Stepperx/Stepper";
import LevelSelect from "../components/Onboarding/LevelSelect/LevelSelect";
import GettingStarted from "../components/Onboarding/GettingStarted/GettingStarted";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUserData } from "../store/user/useUserData";
import ObjectiveSelect from "@/components/Onboarding/ObjectivesEnglish/ObjectivesEnglishSelect";

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  // const { saveChatConfig } = useChat();
  const steps = ["Getting Started", "Level Select", "ObjetiveSelect"];
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/login");
    }
  }, [session]);

  const {
    level,
    objective,
    setUserData,
    hasCompletedOnboarding,
    setLocalHasCompletedOnboardingFlag,
  } = useUserData();

  useEffect(() => {
    if (sessionStatus === "authenticated" && hasCompletedOnboarding) {
      router.replace("/");
    }
  }, [hasCompletedOnboarding]);

  const lastStepOnboardingHandler = async () => {
    //Optimistic update
    setLocalHasCompletedOnboardingFlag(true);
    setUserData({ hasCompletedOnboarding: true });
  };

  const nextHandlers = [null, null, lastStepOnboardingHandler];

  const stepComponents = [
    <GettingStarted />,
    <LevelSelect />,
    <ObjectiveSelect />,
  ];

  const isNextDisabled = () =>
    (activeStep === 1 && level === "") ||
    (activeStep === 2 && objective === "");

  return (
    <Stepperx
      steps={steps}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      stepComponents={stepComponents}
      nextHandlers={nextHandlers}
      isNextDisabled={isNextDisabled}
    />
  );
};

export default OnboardingPage;
