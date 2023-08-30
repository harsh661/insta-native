import { getApp, getApps, initializeApp } from "firebase/app"
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage"

const firebaseConfig = {
  apiKey: "AIzaSyCmb_KIxLaYOyR_WZWCF6iz_SbX3zYYQHM",

  authDomain: "insta-clone-af710.firebaseapp.com",

  projectId: "insta-clone-af710",

  storageBucket: "insta-clone-af710.appspot.com",

  messagingSenderId: "1021656451675",

  appId: "1:1021656451675:web:06dd6093a67a65d3888d7e"
}

let FIREBASE_AUTH, FIREBASE_APP

if (!getApps().length) {
  try {
    FIREBASE_APP = initializeApp(firebaseConfig)
    FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    })
  } catch (error) {
    console.log("Error initializing FIREBASE_APP: " + error)
  }
} else {
  FIREBASE_APP = getApp()
  FIREBASE_AUTH = getAuth(FIREBASE_APP)
}

const db = getFirestore(FIREBASE_APP)

export {FIREBASE_APP, FIREBASE_AUTH, db}