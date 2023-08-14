import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  selectEmail,
  selectUsername,
  selectLevel,
  selectCoffees,
  selectSubscriptionStatus,
  selectUserState,
  selectHasCompletedOnboarding,
} from "./selectors";
import {
  setEmailAction,
  setNameAction,
  setLevelAction,
  setCoffeesAction,
  setSubscriptionStatusAction,
  setUserDataAction,
  setHasCompletedOnboardingAction,
} from "./userSlice";
import { User } from "../../types/User";

export const useUserData = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserState);
  const email = useSelector(selectEmail);
  const username = useSelector(selectUsername);
  const level = useSelector(selectLevel);
  const coffees = useSelector(selectCoffees);
  const subscriptionStatus = useSelector(selectSubscriptionStatus);
  const hasCompletedOnboarding = useSelector(selectHasCompletedOnboarding);

  const setEmail = useCallback(
    (newEmail: string) => {
      dispatch(setEmailAction(newEmail));
    },
    [dispatch]
  );

  const setName = useCallback(
    (newUsername: string) => {
      dispatch(setNameAction(newUsername));
    },
    [dispatch]
  );

  const setLevel = useCallback(
    (newLevel: string) => {
      dispatch(setLevelAction(newLevel));
    },
    [dispatch]
  );

  const setCoffees = useCallback(
    (newCoffees: number) => {
      dispatch(setCoffeesAction(newCoffees));
    },
    [dispatch]
  );

  const setSubscriptionStatus = useCallback(
    (newStatus: string) => {
      dispatch(setSubscriptionStatusAction(newStatus));
    },
    [dispatch]
  );

  const setHasCompletedOnboarding = useCallback(
    (status: boolean) => {
      dispatch(setHasCompletedOnboardingAction(status));
    },
    [dispatch]
  );

  const setUserData = useCallback(
    (data: User) => {
      dispatch(setUserDataAction(data));
    },
    [dispatch]
  );

  return {
    userData,
    email,
    username,
    level,
    coffees,
    subscriptionStatus,
    hasCompletedOnboarding,
    setEmail,
    setName,
    setLevel,
    setCoffees,
    setSubscriptionStatus,
    setHasCompletedOnboarding,
    setUserData,
  };
};
