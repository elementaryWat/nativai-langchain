import React, { useState } from "react";
import Stepperx from "../components/Stepperx/Stepper";
import Head from "next/head";
import TopicSelect from "../components/Onboarding/TopicSelect/TopicSelect";
import GettingStarted from "../components/Onboarding/GettingStarted/GettingStarted";
import LevelSelect from "../components/Onboarding/LevelSelect/LevelSelect";
import { PageContainer } from "../components/Onboarding/styled";
import { useRouter } from "next/router";

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Getting Started", "Level Select", "Topic Select"];

  const goToChat = () => {
    router.push("/chat");
  };
  const nextHandlers = [null, null, goToChat];

  const stepComponents = [<GettingStarted />, <LevelSelect />, <TopicSelect />];

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
      />
    </PageContainer>
  );
};

export default OnboardingPage;
