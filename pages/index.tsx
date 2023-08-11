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
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { differenceInDays } from "date-fns";

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

  const addUserIfNotExists = async (userData) => {
    const db = getFirestore();
    const userRef = doc(db, "users", userData.email);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userLastLoginDate = userSnapshot.data().lastLogin?.toDate(); // Convert Firestore timestamp to JavaScript Date object
      const currentDate = new Date();

      // If there's no lastLogin or if lastLogin isn't today
      if (
        !userLastLoginDate ||
        differenceInDays(currentDate, userLastLoginDate) !== 0
      ) {
        await updateDoc(userRef, {
          lastLogin: serverTimestamp(),
          coffees: 3, // Reset coffees count to 3
        });
      } else {
        await updateDoc(userRef, {
          coffees: userSnapshot.data().coffees || 3, // Set coffees count to 3 if its not defined
        });
      }
    } else {
      try {
        await setDoc(userRef, {
          ...userData,
          accountCreated: serverTimestamp(),
          lastLogin: serverTimestamp(),
          coffees: 3, // Set initial coffees count to 3
        });
        console.log("Usuario agregado correctamente a la base de datos.");
      } catch (error) {
        console.error("Error al agregar el usuario:", error);
      }
    }
  };

  useEffect(() => {
    if (session && session.user) {
      // Crear el objeto userData con los datos del usuario
      const userData = {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        chat: [], // Puedes inicializar el chat como un array vacío
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
