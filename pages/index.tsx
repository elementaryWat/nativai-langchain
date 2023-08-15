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
import { useUserData } from "../store/user/useUserData";

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

  const { getInitialMessage, setUsername, topicConversation } = useChat();

  const { userData: userLocalData, level, fetchUserData } = useUserData();

  const lastStepOnboardingHandler = async () => {
    await getInitialMessage();
    router.push("/chat");
  };
  const nextHandlers = [null, null, lastStepOnboardingHandler];

  const stepComponents = [
    <GettingStarted />,
    // <NameInput />,
    <LevelSelect />,
    <TopicSelect />,
  ];

  useEffect(() => {
    if (session && session.user) {
      fetchUserData(session.user.name, session.user.email, session.user.image);
    }
  }, [session]);

  const isNextDisabled = () =>
    // (activeStep === 1 && username === "") ||
    (activeStep === 1 && level === "") ||
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
