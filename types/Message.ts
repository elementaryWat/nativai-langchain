export interface FeedBack {
  grammar_feedback: string;
  grammar_score: number;
  vocabulary_feedback: string;
  vocabulary_score: number;
  general_score: number;
}

export type FeedbackType = "local" | "final";

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  loadingFeedback?: boolean;
  feedback?: FeedBack;
  audioUrl?: string;
  audioPlaying?: boolean;
}

export interface Chat {
  id: string;
  messages: Message[];
}
