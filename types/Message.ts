export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export class MessageItem implements Message {
  role: "system" | "user" | "assistant";
  content: string;

  constructor(role: "system" | "user" | "assistant", content: string) {
    this.role = role;
    this.content = content;
  }
}
