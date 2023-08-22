import { differenceInDays } from "date-fns";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Message } from "../types/Message";
import { Subscription } from "../types/Subscription";
const SUBSCRIPTIONS_COLLECTION = "subscriptions";
const USERS_COLLECTION = "users";

export const addSubscriptionIfNotExists = async (
  subscriptionData: Subscription
) => {
  const db = getFirestore();
  const subscriptionRef = doc(
    db,
    SUBSCRIPTIONS_COLLECTION,
    subscriptionData.subscriptionId
  );
  const subscriptionSnapshot = await getDoc(subscriptionRef);

  if (subscriptionSnapshot.exists()) {
    console.warn("Subscription with this ID already exists.");
    return;
  } else {
    const newSubscription = {
      userId: subscriptionData.userId,
      userIdTest: subscriptionData.userIdTest,
      status: subscriptionData.subscriptionStatus,
      createdAt: subscriptionData.dateCreated || serverTimestamp(),
    };

    try {
      await setDoc(subscriptionRef, newSubscription);
      console.log("Subscription added successfully");
    } catch (error) {
      console.error("Error adding the subscription:", error);
    }
  }
};

export const addFeedbackIfNotExists = async (
  chatId: string,
  username: string,
  level: string,
  topicConversation: string
) => {
  const db = getFirestore();
  const chatFeedBackRef = doc(db, "feedbacks", chatId);
  const chatFeedbackSnapshot = await getDoc(chatFeedBackRef);
  if (!chatFeedbackSnapshot.exists()) {
    await setDoc(chatFeedBackRef, {
      chatId,
      username,
      level,
      topicConversation,
    });
  }
  return chatFeedBackRef;
};

export const decrementCoffee = async (
  userEmail: string,
  currentCoffees: number,
  setCoffeesCallback: (currentCoffees: number) => void
) => {
  const db = getFirestore();
  const userRef = doc(db, "users", userEmail);
  await updateDoc(userRef, {
    coffees: currentCoffees - 1,
  });
  setCoffeesCallback(currentCoffees - 1);
};
