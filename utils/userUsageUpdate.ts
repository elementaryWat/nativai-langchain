import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

type UsageData = {
  totalConversations: number;
  totalWordsUsed: number;
  topicsChosen: Record<string, number>;
  mostChosenTopic: string;
  chatsStarted: number;
  chatsEnded: number;
};

const USAGE_COLLECTION = "usage";

export const createUsageDocument = async (userEmail: string): Promise<void> => {
  const db = getFirestore();
  const usageRef = doc(db, USAGE_COLLECTION, userEmail);

  await setDoc(usageRef, {
    totalConversations: 0,
    totalWordsUsed: 0,
    topicsChosen: {},
    mostChosenTopic: "",
    chatsStarted: 0,
    chatsEnded: 0,
  } as UsageData);
};

export const addNewChatUsage = async (userEmail: string): Promise<void> => {
  const db = getFirestore();
  const usageRef = doc(db, USAGE_COLLECTION, userEmail);
  const usageSnap = await getDoc(usageRef);

  if (!usageSnap.exists()) {
    await createUsageDocument(userEmail);
  }
  const usageData = usageSnap.data() as UsageData;
  const chatsStarted = (usageData?.chatsStarted || 0) + 1;

  // Update the usage document
  await updateDoc(usageRef, {
    chatsStarted,
  });
};

export const updateUsageStatistics = async (
  userEmail: string,
  wordCount: number,
  topic: string
): Promise<void> => {
  const db = getFirestore();
  const usageRef = doc(db, USAGE_COLLECTION, userEmail);
  const usageSnap = await getDoc(usageRef);

  if (!usageSnap.exists()) {
    await createUsageDocument(userEmail);
  }
  const usageData = usageSnap.data() as UsageData;
  // Increment total conversations and words used
  const totalConversations = usageData.totalConversations + 1;
  const totalWordsUsed = (usageData?.totalWordsUsed || 0) + wordCount;

  // Increment topic count
  const topicsChosen = { ...usageData.topicsChosen };
  topicsChosen[topic] = (topicsChosen[topic] || 0) + 1;
  const mostChosenTopic = Object.entries(topicsChosen).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];

  const chatsEnded = (usageData?.chatsEnded || 0) + 1;

  // Update the usage document
  await updateDoc(usageRef, {
    totalConversations,
    totalWordsUsed,
    topicsChosen,
    chatsEnded,
    mostChosenTopic,
  });
};
