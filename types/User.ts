import { Chat } from "./Message";

export interface User {
  email: string;
  name: string;
  level?: string;
  coffees?: number;
  hasCompletedOnboarding?: boolean;
  subscriptionStatus?: string; // could be "active", "inactive", etc.
  image?: string;
  chats?: Chat[];
}
