import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { differenceInCalendarDays } from "date-fns";
import { User, UserUpdate } from "../../types/User";
import { AppState } from "..";
import { cancelUserSubscription } from "@/utils/endpoints";
const USERS_COLLECTION = "users";

export const fetchUserDataAction = createAsyncThunk<
  User,
  { userName: string; userEmail: string; image: string },
  { rejectValue: any; state: AppState }
>(
  "user/fetchUserData",
  async ({ userEmail }, { rejectWithValue, getState }) => {
    const db = getFirestore();
    const userRef = doc(db, USERS_COLLECTION, userEmail);
    const userSnapshot = await getDoc(userRef);
    let userData = getState().user.userData;

    if (userSnapshot.exists()) {
      return { ...userData, ...userSnapshot.data() } as User;
    } else {
      return null;
    }
  }
);

export const updateUserStreakAction = createAsyncThunk<
  { streak: number; longestStreak: number; lastUse: Date },
  { email: string }
>("user/updateUserStreak", async ({ email }) => {
  const db = getFirestore();
  const userRef = doc(db, USERS_COLLECTION, email);
  const userSnapshot = await getDoc(userRef);

  const userDataDB = userSnapshot.data();
  const userLastLoginDate = new Date(userDataDB.lastUse.seconds * 1000);
  const currentDate = new Date();
  let dayDifference = differenceInCalendarDays(currentDate, userLastLoginDate);
  let streak = userDataDB.streak || 0;
  let longestStreak = userDataDB.longestStreak || 0;
  console.log(currentDate);
  console.log(dayDifference);

  // Si el último inicio de sesión fue ayer, incrementa la racha.
  if (dayDifference === 1) {
    streak += 1;
  } else if (dayDifference > 1) {
    // Si la diferencia es más de un día, reinicia la racha.
    streak = 1;
  }

  // Actualizar la racha más larga si la racha actual es más grande.
  if (streak > longestStreak) {
    longestStreak = streak;
  }
  await updateDoc(userRef, {
    ...userDataDB,
    streak,
    longestStreak,
    lastUse: currentDate,
  });
  return { streak, longestStreak, lastUse: currentDate };
});

export const updateUserInitialDataAction = createAsyncThunk<
  User,
  { userName: string; userEmail: string; image: string },
  { rejectValue: any; state: AppState }
>(
  "user/updateInitialData",
  async ({ userName, userEmail, image }, { rejectWithValue, getState }) => {
    const db = getFirestore();
    const userRef = doc(db, USERS_COLLECTION, userEmail);
    const userSnapshot = await getDoc(userRef);

    let userDataModified;
    let userData = getState().user.userData;

    if (userSnapshot.exists()) {
      const userDataDB = userSnapshot.data();
      const hasCompletedOnboarding = userDataDB.hasCompletedOnboarding || false;
      const userLastLoginDate = new Date(userDataDB.lastLogin.seconds * 1000);
      const userEmailMp = userDataDB.emailMp || userDataDB.email;
      // const oneMonthAgo = new Date("2023-07-20T16:29:18.075-04:00");
      const currentDate = new Date();
      let dayDifference = differenceInCalendarDays(
        currentDate,
        userLastLoginDate
      );
      console.log(dayDifference);
      let coffees =
        userSnapshot.data().coffees !== undefined
          ? userSnapshot.data().coffees
          : 3;
      userDataModified = {
        ...userData,
        ...userDataDB,
        hasCompletedOnboarding,
        emailMP: userEmailMp,
      };
      if (!userLastLoginDate || dayDifference !== 0) {
        userDataModified = {
          ...userDataModified,
          lastLogin: serverTimestamp(),
          coffees: 3,
        };
      } else {
        userDataModified = {
          ...userDataModified,
          coffees,
        };
      }
      await updateDoc(userRef, { ...userDataModified });
    } else {
      try {
        userDataModified = {
          ...userData,
          name: userName, // Use email prefix as default name
          email: userEmail,
          emailMP: userEmail,
          image,
          accountCreated: serverTimestamp(),
          hasCompletedOnboarding: false,
          lastLogin: serverTimestamp(),
          lastUse: serverTimestamp(),
          chats: [],
          coffees: 3,
        };
        await setDoc(userRef, { ...userDataModified });
      } catch (error) {
        return rejectWithValue(error);
      }
    }
    return userDataModified;
  }
);

export const updateUserDataAction = createAsyncThunk<
  UserUpdate,
  { updatedData: UserUpdate },
  { rejectValue: any; state: AppState }
>("user/updateUser", async ({ updatedData }, { rejectWithValue, getState }) => {
  const db = getFirestore();
  let userData = getState().user.userData;
  const userRef = doc(db, USERS_COLLECTION, userData.email);
  try {
    await updateDoc(userRef, { ...userData, ...updatedData });
    return { ...userData, ...updatedData }; // returning the updated data
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const cancelSubscriptionAction = createAsyncThunk<
  void, // Expected return type of the payload creator
  void,
  {
    rejectValue: any;
    state: AppState;
  }
>("user/cancelSubscription", async (_, { rejectWithValue, getState }) => {
  try {
    const subscriptionId = getState().user.userData.subscriptionId;
    if (!subscriptionId) {
      throw new Error("No subscriptionId found in the state");
    }

    const response = await cancelUserSubscription(subscriptionId);

    return response;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});
