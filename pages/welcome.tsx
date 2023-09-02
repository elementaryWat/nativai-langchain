import React, { useEffect } from "react";
import { useUserData } from "@/store/user/useUserData";
import WelcomeUserPro from "@/components/WelcomeUserPro/WelcomeUserPro";
import { ANALYTICS_EVENTS, trackEvent } from "@/utils/analyticsMethods";

const WelcomeScreen: React.FC = () => {
  const { username } = useUserData();
  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.WELCOME_SUBSCRIPTION_PAGE, { username });
  }, []);
  return <WelcomeUserPro name={username} />;
};

export default WelcomeScreen;
