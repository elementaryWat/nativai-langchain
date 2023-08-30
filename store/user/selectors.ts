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

export const selectTestEmail = createSelector(
  selectUserState,
  (user) => user.testEmail
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

export const selectWordsUsedTotalCount = createSelector(
  selectUserState,
  (user) => user.totalWords
);

export const selectSentencesUsedTotalCount = createSelector(
  selectUserState,
  (user) => user.totalSentences
);

export const selectSubscriptionStatus = createSelector(
  selectUserState,
  (user) => user.subscriptionStatus
);

export const selectExpirationDateSubscription = createSelector(
  selectUserState,
  (user) => user.expirationDateSubscription
);

export const selectIsProMember = createSelector(
  [selectSubscriptionStatus, selectExpirationDateSubscription], // <-- Assuming you have a selector for the expiration date
  (subscriptionStatus, expirationDateSubscription) => {
    const currentDate = new Date();
    const expirationDate = new Date(expirationDateSubscription);
    return subscriptionStatus === "authorized" || currentDate < expirationDate;
  }
);

export const selectHasCoffeesRemaining = createSelector(
  [selectIsProMember, selectCoffees],
  (isProMember, amountCoffees) => isProMember || amountCoffees > 0
);

export const selectHasCompletedOnboarding = createSelector(
  selectUserState,
  (user) => user.hasCompletedOnboarding
);
