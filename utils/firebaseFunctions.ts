import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Subscription } from "../types/Subscription";
import { User } from "lucide-react";
import { Message } from "@/types/Message";
const SUBSCRIPTIONS_COLLECTION = "subscriptions";

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
      // userIdTest: subscriptionData.userIdTest,
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
  email: string,
  level: string,
  topicConversation: string
) => {
  const db = getFirestore();
  const chatFeedBackRef = doc(db, "feedbacks", chatId);
  const chatFeedbackSnapshot = await getDoc(chatFeedBackRef);
  if (!chatFeedbackSnapshot.exists()) {
    await setDoc(chatFeedBackRef, {
      chatId,
      email,
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


export const addChatIfNotExists = async (
  chatId: string,
  messages: Message[],
  user: string,
  email: string, 
  level: string, 
  topicConversation: string
) => {
  const db = getFirestore();
  const chatRef = doc(db, "chats", chatId);
  const chatSnapshot = await getDoc(chatRef);

  if (!chatSnapshot.exists()) {
    await setDoc(chatRef, {
      chatId,
      messages,
      user,
      email,
      level,
      topicConversation,
    });
  }

  return chatRef;
};

export const addMessage = async (chatId, message, user) => {
  const db = getFirestore();
  const chatRef = doc(db, "chats", chatId);
  const chatSnapshot = await getDoc(chatRef);

  if (chatSnapshot.exists()) {
    const chatData = chatSnapshot.data();
    const messages = chatData.messages || [];
    messages.push(message);

    // Actualizar el documento con los datos actualizados
    const newChatData = {
      ...chatData,
      messages: messages,
      user: user
    };

    await setDoc(chatRef, newChatData);
  }
};


export const getChats = async (email: string) => {
  try {
    const arr1: any[] = [];
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "chats"));
    querySnapshot.forEach((doc) => {
      const arr: any = {
        chatId: doc.data().chatId,
        email: doc.data().email,
        level: doc.data().level,
        topicConversation: doc.data().topicConversation,
        user: doc.data().user,
        messages: doc.data().messages,
      };
      arr1.push(arr);
    });
    const chat = arr1.filter((chat) => chat.email === email);
    return chat;
  } catch (error) {
    console.error("Error al obtener los datos de la colección:", error);
  }
}




//  interface Feedback {
//     comment: string;
//     chatId: string;
//     rating: number;
//   }


//   function formatearChatId(arg: string): string {
//     const indiceDelGuion = arg.indexOf('-') + 1;
//     const fechaFormateada = arg.slice(indiceDelGuion, indiceDelGuion + 10);
//     return fechaFormateada;
//   }



// export const getFeedback = async (email: string) => {
//   try {
//     const arr1: Feedback[] = [];
//     const db = getFirestore();
//     const querySnapshot = await getDocs(collection(db, "feedbacks"));
//     querySnapshot.forEach((doc) => {
//       const arr: Feedback = {
//         comment: doc.data().comment,
//         chatId: formatearChatId(doc.data().chatId),
//         rating: doc.data().rating
//       };
//       console.log(arr);
//       arr1.push(arr);
//     });

//     return arr1;
//   } catch (error) {
//     console.error("Error al obtener los datos de la colección:", error);
//   }
// }


