import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  selectEmail,
  selectUsername,
  selectLevel,
  selectCoffees,
  selectSubscriptionStatus,
  selectUserState,
  selectHasCompletedOnboarding,
  selectStatus,
  selectChats,
} from "./selectors";
import {
  fetchUserDataAction,
  updateUserDataAction,
  updateUserInitialDataAction,
} from "./asyncActions";
import { useAppDispatch } from "..";
import { UserUpdate } from "../../types/User";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const useUserData = () => {
  const dispatch = useAppDispatch();
  const loadingStatus = useSelector(selectStatus);
  const userData = useSelector(selectUserState);
  const email = useSelector(selectEmail);
  const chats = useSelector(selectChats);
  const username = useSelector(selectUsername);
  const level = useSelector(selectLevel);
  const coffees = useSelector(selectCoffees);
  const subscriptionStatus = useSelector(selectSubscriptionStatus);
  const hasCompletedOnboarding = useSelector(selectHasCompletedOnboarding);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/login");
    }
    if (session && session.user) {
      fetchUserData(session.user.name, session.user.email, session.user.image);
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

  return {
    loadingStatus,
    userData,
    chats,
    email,
    username,
    level,
    coffees,
    subscriptionStatus,
    hasCompletedOnboarding,
    fetchUserData,
    setUserData,
  };
};
