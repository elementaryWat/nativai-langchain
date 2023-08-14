import { Chat, Message } from "./Message";

export interface User {
  email: string;
  name: string;
  image?: string;
  chats?: Chat[];
}
