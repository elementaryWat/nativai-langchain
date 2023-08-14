import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

const initialState: User = {
  email: "",
  name: "",
  level: "",
  coffees: 0,
  subscriptionStatus: "inactive",
};

export const userConfigSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmailAction: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setNameAction: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setLevelAction: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
    },
    setCoffeesAction: (state, action: PayloadAction<number>) => {
      state.coffees = action.payload;
    },
    incrementCoffeesAction: (state) => {
      state.coffees += 1;
    },
    decrementCoffeesAction: (state) => {
      state.coffees -= 1;
    },
    setSubscriptionStatusAction: (state, action: PayloadAction<string>) => {
      state.subscriptionStatus = action.payload;
    },
    setUserDataAction: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.image = action.payload.image;
      state.level = action.payload.level;
      state.coffees = action.payload.coffees;
      state.subscriptionStatus = action.payload.subscriptionStatus;
    },
  },
});

export const {
  setEmailAction,
  setNameAction,
  setLevelAction,
  setCoffeesAction,
  incrementCoffeesAction,
  decrementCoffeesAction,
  setSubscriptionStatusAction,
  setUserDataAction,
} = userConfigSlice.actions;

export default userConfigSlice;
