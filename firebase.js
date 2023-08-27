import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: 'AIzaSyCmb_KIxLaYOyR_WZWCF6iz_SbX3zYYQHM',

  authDomain: process.env.REACT_FIREBASE_AUTH_DOMAIN,

  projectId: process.env.REACT_FIREBASE_PROJECT_ID,

  storageBucket: process.env.REACT_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: process.env.REACT_FIREBASE_MESSAGING_ID,

  appId: process.env.REACT_FIREBASE_APP_ID,
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_STORE = getFirestore(FIREBASE_APP)
