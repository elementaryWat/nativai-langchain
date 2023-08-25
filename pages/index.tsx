import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SignOutButton } from "../components/AuthComponent/SignOut";
import { useUserData } from "../store/user/useUserData";
import TopicSelection from "../components/TopicSelection";
import { Grid } from "@mui/material";

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
    <Grid container width="100%">
      <SignOutButton />
      <TopicSelection />
    </Grid>
  );
};

export default HomePage;
