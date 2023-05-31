import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatbotConfigState {
  level: string;
}

const initialState: ChatbotConfigState = {
  level: "",
};

export const chatbotConfigSlice = createSlice({
  name: "chatbotConfig",
  initialState,
  reducers: {
    setLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
    },
  },
});

export const { setLevel } = chatbotConfigSlice.actions;

export default chatbotConfigSlice;
