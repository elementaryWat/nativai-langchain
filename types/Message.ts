export interface FeedBack {
  feedback: string;
  score: number;
}

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  loadingFeedback?: boolean;
  feedback?: FeedBack;
  audioUrl?: string;
  audioPlaying?: boolean;
}
