import { useSelector } from "react-redux";
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
import { fetchUserDataAction, updateUserDataAction } from "./asyncActions";
import { useAppDispatch } from "..";
import { UserUpdate } from "../../types/User";

export const useUserData = () => {
  const dispatch = useAppDispatch();
  const userData = useSelector(selectUserState);
  const email = useSelector(selectEmail);
  const username = useSelector(selectUsername);
  const level = useSelector(selectLevel);
  const coffees = useSelector(selectCoffees);
  const subscriptionStatus = useSelector(selectSubscriptionStatus);
  const hasCompletedOnboarding = useSelector(selectHasCompletedOnboarding);

  const fetchUserData = useCallback(
    (userName: string, userEmail: string, image: string) => {
      dispatch(fetchUserDataAction({ userName, userEmail, image }));
    },
    [dispatch]
  );

  const setUserData = useCallback(
    (userEmail: string, updatedData: UserUpdate) => {
      dispatch(updateUserDataAction({ userEmail, updatedData }));
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
    fetchUserData,
    setUserData,
  };
};
