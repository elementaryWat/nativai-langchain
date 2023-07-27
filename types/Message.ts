export const SCORE_FEEDBACK_VALUE = {
  Basic: 1,
  Intermediate: 2,
  Advanced: 3,
};
export interface FeedBack {
  grammar_feedback: string;
  vocabulary_feedback: string;
  score: "Basic" | "Intermediate" | "Advanced";
}

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  loadingFeedback?: boolean;
  feedback?: FeedBack;
  audioUrl?: string;
  audioPlaying?: boolean;
}


export interface User {
  uid: string;
  email: string;
  name: string;
  image?: string;
  chat?: Message[];
}

