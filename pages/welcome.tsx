import React from "react";
import { useUserData } from "@/store/user/useUserData";
import WelcomeUserPro from "@/components/WelcomeUserPro/WelcomeUserPro";

const WelcomeScreen: React.FC = () => {
  const { username } = useUserData();

  return <WelcomeUserPro name={username} />;
};

export default WelcomeScreen;
