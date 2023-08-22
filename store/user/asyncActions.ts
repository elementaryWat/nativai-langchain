import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { differenceInDays } from "date-fns";
import { User, UserUpdate } from "../../types/User";
import { AppState } from "..";
const USERS_COLLECTION = "users";

export const fetchUserDataAction = createAsyncThunk<
  User,
  { userName: string; userEmail: string; image: string }
>("user/fetchUserData", async ({ userEmail }, { rejectWithValue }) => {
  const db = getFirestore();
  const userRef = doc(db, USERS_COLLECTION, userEmail);
  const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data() as User;
  } else {
    return null;
  }
});

export const updateUserInitialDataAction = createAsyncThunk<
  User,
  { userName: string; userEmail: string; image: string }
>(
  "user/updateInitialData",
  async ({ userName, userEmail, image }, { rejectWithValue }) => {
    const db = getFirestore();
    const userRef = doc(db, USERS_COLLECTION, userEmail);
    const userSnapshot = await getDoc(userRef);

    let userDataModified;

    if (userSnapshot.exists()) {
      const userDataDB = userSnapshot.data();
      const hasCompletedOnboarding = userDataDB.hasCompletedOnboarding || false;
      const userLastLoginDate = userDataDB.lastLogin?.toDate();
      const currentDate = new Date();

      if (
        !userLastLoginDate ||
        differenceInDays(currentDate, userLastLoginDate) !== 0
      ) {
        userDataModified = {
          ...userDataDB,
          hasCompletedOnboarding,
          lastLogin: serverTimestamp(),
          coffees: 3,
        };
      } else {
        userDataModified = {
          ...userDataDB,
          hasCompletedOnboarding,
          coffees: userSnapshot.data().coffees || 3,
        };
      }
      await updateDoc(userRef, { ...userDataModified });
    } else {
      try {
        userDataModified = {
          name: userName, // Use email prefix as default name
          email: userEmail,
          image,
          accountCreated: serverTimestamp(),
          hasCompletedOnboarding: false,
          lastLogin: serverTimestamp(),
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
  User,
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
