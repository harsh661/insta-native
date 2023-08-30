import { createContext, useContext, useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../firebase"

export const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const currentUser = FIREBASE_AUTH.currentUser

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", currentUser?.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setUser(docSnap.data())
      } else {
        console.log("Unauthorized")
      }
    }
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default function useGetUser() {
  return useContext(UserContext)
}
