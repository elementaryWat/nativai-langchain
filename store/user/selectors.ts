import { createSelector } from "reselect";
import { RootState } from "..";

export const selectUserState = (state: RootState) => state.user;

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

export const selectCoffees = createSelector(
  selectUserState,
  (user) => user.coffees
);

export const selectSubscriptionStatus = createSelector(
  selectUserState,
  (user) => user.subscriptionStatus
);
