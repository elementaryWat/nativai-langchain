export interface FeedBack {
  feedback: string;
  score: number;
}

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  feedback?: FeedBack;
}

export class MessageItem implements Message {
  role: "system" | "user" | "assistant";
  content: string;
  feedback?: FeedBack;

  constructor(
    role: "system" | "user" | "assistant",
    content: string,
    feedback = undefined
  ) {
    this.role = role;
    this.content = content;
    this.feedback = feedback;
  }
}
