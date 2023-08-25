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
let hasFetchedUserData = false;

export const useUserData = () => {
  const dispatch = useAppDispatch();
  const loadingStatus = useSelector(selectStatus);
  const userData = useSelector(selectUserState);
  const email = useSelector(selectEmail);
  const chats = useSelector(selectChats);
  const username = useSelector(selectUsername);
  const level = useSelector(selectLevel);
  const objective = useSelector(selectObjective);
  const coffees = useSelector(selectCoffees);
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

  return {
    loadingStatus,
    userData,
    chats,
    email,
    username,
    level,
    objective,
    coffees,
    isProMember,
    hasCoffeesRemaining,
    hasCompletedOnboarding,
    fetchUserData,
    setUserData,
  };
};
