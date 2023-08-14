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
import { User } from "../types/User";
const SUBSCRIPTIONS_COLLECTION = "subscriptions";
const USERS_COLLECTION = "users";

export const addUserIfNotExists = async (userData: User) => {
  const db = getFirestore();
  const userRef = doc(db, USERS_COLLECTION, userData.email);
  const userSnapshot = await getDoc(userRef);
  let userDataModified;

  if (userSnapshot.exists()) {
    const userLastLoginDate = userSnapshot.data().lastLogin?.toDate(); // Convert Firestore timestamp to JavaScript Date object
    const currentDate = new Date();

    // If there's no lastLogin or if lastLogin isn't today
    if (
      !userLastLoginDate ||
      differenceInDays(currentDate, userLastLoginDate) !== 0
    ) {
      userDataModified = {
        ...userData,
        lastLogin: serverTimestamp(),
        coffees: 3, // Reset coffees count to 3
      };
      await updateDoc(userRef, {
        userDataModified,
      });
    } else {
      userDataModified = {
        ...userData,
        coffees: userSnapshot.data().coffees || 3, // Set coffees to actual count or to 3 if its not defined
      };
      await updateDoc(userRef, {
        userDataModified,
      });
    }
  } else {
    try {
      userDataModified = {
        ...userData,
        accountCreated: serverTimestamp(),
        lastLogin: serverTimestamp(),
        coffees: 3, // Set initial coffees count to 3
      };
      await setDoc(userRef, {
        userDataModified,
      });
      console.log("Usuario agregado correctamente a la base de datos.");
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
    }
  }
  return userDataModified;
};

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
  topicConversation: string,
  messages: Message[]
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
      messages,
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
