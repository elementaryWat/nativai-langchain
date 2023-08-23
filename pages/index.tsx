import React from "react";
import { PageContainer } from "../components/Onboarding/styled";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { SignOutButton } from "../components/AuthComponent/SignOut";
import { useUserData } from "../store/user/useUserData";
import TopicSelection from "../components/TopicSelection";

const HomePage: React.FC = () => {
  const router = useRouter();

  const { hasCompletedOnboarding, loadingStatus } = useUserData();

  useEffect(() => {
    if (loadingStatus !== "loading") {
      if (!hasCompletedOnboarding) {
        router.replace("/getting-started");
      }
    }
  }, [hasCompletedOnboarding, loadingStatus]);

  return (
    <PageContainer background="linear-gradient(180deg, #6e45ff, black)">
      <SignOutButton />
      <TopicSelection />
    </PageContainer>
  );
};

export default HomePage;
