import { Chat } from "./Message";

export const ENGLISH_LEVELS = {
  B1: "B1 - Intermediate",
  B2: "B2 - Upper intermediate",
  C1: "C1 - Advanced",
  C2: "C2 - Proficient",
};

export type UserLevel =
  | "B1 - Intermediate"
  | "B2 - Upper intermediate"
  | "C1 - Advanced"
  | "C2 - Proficient";

export type SubscriptionState =
  | "pending"
  | "authorized"
  | "paused"
  | "cancelled";
export interface User {
  email: string;
  name: string;
  image?: string;
  level?: UserLevel | "";
  coffees?: number;
  lastLogin?: string;
  hasCompletedOnboarding?: boolean;
  //https://www.mercadopago.com.ar/developers/es/reference/subscriptions/_preapproval_id/get
  subscriptionStatus?: SubscriptionState;
  subscriptionId?: string;
  chats?: Chat[];
}

export interface UserUpdate {
  email?: string;
  name?: string;
  image?: string;
  level?: string;
  coffees?: number;
  lastLogin?: Date;
  hasCompletedOnboarding?: boolean;
  subscriptionStatus?: SubscriptionState;
  subscriptionId?: string;
  chats?: Chat[];
}
