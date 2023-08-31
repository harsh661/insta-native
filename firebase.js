import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,

  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,

  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,

  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,

  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_ID,

  appId: process.env.EXPO_PUBLIC_APP_ID,
}

const FIREBASE_APP = initializeApp(firebaseConfig)
const FIREBASE_AUTH = getAuth(FIREBASE_APP)

const db = getFirestore(FIREBASE_APP)
const storage = getStorage(FIREBASE_APP)

export { FIREBASE_APP, FIREBASE_AUTH, db, storage }
