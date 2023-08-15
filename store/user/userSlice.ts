import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { fetchUserDataAction, updateUserDataAction } from "./asyncActions";

const initialState: { userData: User; status: string; error: string } = {
  userData: {
    email: "",
    name: "",
    level: "",
    coffees: 0,
    subscriptionStatus: "pending",
    subscriptionId: "",
    hasCompletedOnboarding: false,
  },
  status: "",
  error: "",
};

export const userConfigSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
      });
  },
});

// export const {

// } = userConfigSlice.actions;

export default userConfigSlice;
