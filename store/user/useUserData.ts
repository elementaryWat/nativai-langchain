import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  selectEmail,
  selectUsername,
  selectLevel,
  selectCoffees,
  selectUserState,
  selectHasCompletedOnboarding,
  selectStatus,
  selectChats,
  selectObjective,
  selectIsProMember,
  selectHasCoffeesRemaining,
  selectLongestStreak,
  selectWordsUsedTotalCount,
  selectSentencesUsedTotalCount,
  selectSubscriptionStatus,
  selectExpirationDateSubscription,
  selectTestEmail,
  selectEmailMP,
} from "./selectors";
import {
  cancelSubscriptionAction,
  fetchUserDataAction,
  updateUserDataAction,
  updateUserInitialDataAction,
  updateUserStreakAction,
} from "./asyncActions";
import { useAppDispatch } from "..";
import { UserUpdate } from "../../types/User";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { setOnboardingStatusAction } from "./userSlice";
let hasFetchedUserData = false;

export const useUserData = () => {
  const dispatch = useAppDispatch();
  const loadingStatus = useSelector(selectStatus);
  const userData = useSelector(selectUserState);
  const email = useSelector(selectEmail);
  const emailMP = useSelector(selectEmailMP);
  const testEmail = useSelector(selectTestEmail);
  const chats = useSelector(selectChats);
  const username = useSelector(selectUsername);
  const level = useSelector(selectLevel);
  const objective = useSelector(selectObjective);
  const coffees = useSelector(selectCoffees);
  const longestStreak = useSelector(selectLongestStreak);
  const wordsUsedTotalCount = useSelector(selectWordsUsedTotalCount);
  const sentencesUsedTotalCount = useSelector(selectSentencesUsedTotalCount);
  const subscriptionStatus = useSelector(selectSubscriptionStatus);
  const expirationDateSubscription = useSelector(
    selectExpirationDateSubscription
  );
  const isProMember = useSelector(selectIsProMember);
  const hasCoffeesRemaining = useSelector(selectHasCoffeesRemaining);
  const hasCompletedOnboarding = useSelector(selectHasCompletedOnboarding);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (!hasFetchedUserData) {
      if (sessionStatus === "unauthenticated") {
        router.replace("/login");
      }
      if (session && session.user) {
        fetchUserData(
          session.user.name,
          session.user.email,
          session.user.image
        );
        hasFetchedUserData = true;
      }
    }
  }, [session]);

  const fetchUserData = useCallback(
    (userName: string, userEmail: string, image: string) => {
      dispatch(fetchUserDataAction({ userName, userEmail, image }));
      dispatch(updateUserInitialDataAction({ userName, userEmail, image }));
    },
    [dispatch]
  );

  const setUserData = useCallback(
    (updatedData: UserUpdate) => {
      dispatch(updateUserDataAction({ updatedData }));
    },
    [dispatch]
  );

  const updateUserStreak = useCallback(() => {
    dispatch(updateUserStreakAction({ email }));
  }, [dispatch]);

  const setLocalHasCompletedOnboardingFlag = useCallback(
    (hasCompletedOnboarding: boolean) => {
      dispatch(setOnboardingStatusAction(hasCompletedOnboarding));
    },
    [dispatch]
  );

  const decrementCoffees = () => {
    setUserData({
      coffees: coffees > 0 ? coffees - 1 : 0,
    });
  };

  const cancelUserSubscription = useCallback(() => {
    dispatch(cancelSubscriptionAction());
  }, [dispatch]);

  return {
    loadingStatus,
    userData,
    chats,
    email,
    emailMP,
    testEmail,
    username,
    level,
    objective,
    coffees,
    longestStreak,
    wordsUsedTotalCount,
    sentencesUsedTotalCount,
    subscriptionStatus,
    expirationDateSubscription,
    isProMember,
    hasCoffeesRemaining,
    hasCompletedOnboarding,
    fetchUserData,
    setUserData,
    updateUserStreak,
    setLocalHasCompletedOnboardingFlag,
    decrementCoffees,
    cancelUserSubscription,
  };
};
