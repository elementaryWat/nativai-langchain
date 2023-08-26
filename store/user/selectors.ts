import { createSelector } from "reselect";
import { AppState } from "..";

export const selectUserState = (state: AppState) => state.user.userData;

export const selectStatus = (state: AppState) => state.user.status;

export const selectChats = createSelector(
  selectUserState,
  (user) => user.chats
);

export const selectEmail = createSelector(
  selectUserState,
  (user) => user.email
);

export const selectUsername = createSelector(
  selectUserState,
  (user) => user.name
);

export const selectLevel = createSelector(
  selectUserState,
  (user) => user.level
);

export const selectObjective = createSelector(
  selectUserState,
  (user) => user.objective
);

export const selectCoffees = createSelector(
  selectUserState,
  (user) => user.coffees
);

export const selectStreak = createSelector(
  selectUserState,
  (user) => user.streak
);

export const selectLongestStreak = createSelector(
  selectUserState,
  (user) => user.longestStreak
);

export const selectSubscriptionStatus = createSelector(
  selectUserState,
  (user) => user.subscriptionStatus
);

export const selectIsProMember = createSelector(
  selectSubscriptionStatus,
  (subscriptionStatus) => subscriptionStatus === "authorized"
);

export const selectHasCoffeesRemaining = createSelector(
  [selectIsProMember, selectCoffees],
  (isProMember, amountCoffees) => isProMember || amountCoffees > 0
);

export const selectHasCompletedOnboarding = createSelector(
  selectUserState,
  (user) => user.hasCompletedOnboarding
);
