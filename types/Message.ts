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


export interface User {
  uid: string;
  email: string;
  name: string;
  image?: string;
  chat?: Message[];
}

