import { Chat } from "./Message";

export type UserLevel =
  | ""
  | "B1 - Intermediate"
  | "B2 - Upper intermediate"
  | "C1 - Advanced"
  | "C2 - Proficient";

export const ENGLISH_LEVELS = {
  B1: "B1 - Intermediate",
  B2: "B2 - Upper intermediate",
  C1: "C1 - Advanced",
  C2: "C2 - Proficient",
};

export type UserObjective =
  | ""
  | "TRAVEL"
  | "CAREER"
  | "CONVERSE"
  | "PERSONAL_GROWTH"
  | "OTHER";

export const OBJECTIVES = {
  TRAVEL: "Viajar o vivir en el extranjero",
  CAREER: "Acelerar mi carrera profesional",
  CONVERSE: "Hablar con extranjeros",
  PERSONAL_GROWTH: "Superacion Personal",
  OTHER: "Otro",
};

export type SubscriptionState =
  | "pending"
  | "authorized"
  | "paused"
  | "cancelled";
export interface User {
  email: string;
  emailMP?: string;
  name: string;
  image?: string;
  testEmail?: string;
  level?: UserLevel;
  objective?: UserObjective;
  streak?: number;
  longestStreak?: number;
  totalWords?: number;
  totalSentences?: number;
  coffees?: number;
  lastUse?: Date;
  lastLogin?: Date;
  hasCompletedOnboarding?: boolean;
  //https://www.mercadopago.com.ar/developers/es/reference/subscriptions/_preapproval_id/get
  subscriptionStatus?: SubscriptionState;
  expirationDateSubscription?: Date;
  subscriptionId?: string;
  chats?: Chat[];
}

export interface UserUpdate {
  email?: string;
  emailMP?: string;
  name?: string;
  image?: string;
  testEmail?: string;
  level?: UserLevel;
  objective?: UserObjective;
  coffees?: number;
  streak?: number;
  longestStreak?: number;
  totalWords?: number;
  totalSentences?: number;
  lastUse?: Date;
  lastLogin?: Date;
  hasCompletedOnboarding?: boolean;
  subscriptionStatus?: SubscriptionState;
  expirationDateSubscription?: Date;
  subscriptionId?: string;
  chats?: Chat[];
}
