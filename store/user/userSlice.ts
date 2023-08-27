import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import {
  cancelSubscriptionAction,
  fetchUserDataAction,
  updateUserDataAction,
  updateUserInitialDataAction,
} from "./asyncActions";

export type LoadingStatus = "loading" | "succeeded" | "failed";

const initialState: { userData: User; status: LoadingStatus; error: string } = {
  userData: {
    email: "",
    name: "",
    level: "B1 - Intermediate",
    objective: "CAREER",
    coffees: 3,
    streak: 0,
    longestStreak: 0,
    totalWords: 0,
    totalSentences: 0,
    subscriptionStatus: "pending",
    subscriptionId: "",
    hasCompletedOnboarding: false,
    chats: [],
  },
  status: "loading",
  error: "",
};

export const userConfigSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setOnboardingStatusAction: (state, action: PayloadAction<boolean>) => {
      state.userData.hasCompletedOnboarding = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDataAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchUserDataAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserInitialDataAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserInitialDataAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(updateUserInitialDataAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserDataAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserDataAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        // merge updated data with existing userData
        state.userData = { ...state.userData, ...action.payload };
      })
      .addCase(updateUserDataAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(cancelSubscriptionAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cancelSubscriptionAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData.subscriptionStatus = "cancelled";
      })
      .addCase(cancelSubscriptionAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setOnboardingStatusAction } = userConfigSlice.actions;

export default userConfigSlice;
