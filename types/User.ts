import { Chat } from "./Message";
export type SubscriptionState =
  | "pending"
  | "authorized"
  | "paused"
  | "cancelled";
export interface User {
  email: string;
  name: string;
  image?: string;
  level?: string;
  coffees?: number;
  lastLogin?: Date;
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
