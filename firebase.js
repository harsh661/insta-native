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

  authDomain: process.env.REACT_FIREBASE_AUTH_DOMAIN,

  projectId: process.env.REACT_FIREBASE_PROJECT_ID,

  storageBucket: process.env.REACT_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: process.env.REACT_FIREBASE_MESSAGING_ID,

  appId: process.env.REACT_FIREBASE_APP_ID,
}

let FIREBASE_APP, FIREBASE_AUTH

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

const FIREBASE_STORE = getFirestore(FIREBASE_APP)

export {FIREBASE_APP, FIREBASE_AUTH, FIREBASE_STORE}
