import React, { useContext, useEffect } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/Header"
import Stories from "../components/stories/Stories"
import Post from "../components/posts/Post"
import Navbar from "../components/Navbar"
import { FIREBASE_AUTH, db } from "../firebase"
import { useNavigation } from "@react-navigation/native"
import useGetUser from "../contexts/UserContext"
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

const HomeScreen = () => {
  const {setUser} = useGetUser()
  const navigation = useNavigation()
  const currentUser = FIREBASE_AUTH.currentUser

  const fetchUser = async () => {
    const docRef = doc(db, "users", currentUser?.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setUser(docSnap.data())
    } else {
      console.log("Unauthorized")
    }
  }

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        fetchUser()
      } else {
        navigation.navigate('Login')
      }
    })
  }, [currentUser])

  return (
    <SafeAreaView style={{ height: 100 + "%" }}>
      <Header />
      <ScrollView>
        <Stories />
        <Post />
        <Post />
        <Post />
        <View style={{ padding: 30, paddingBottom: 100 }}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            You're all caught up
          </Text>
        </View>
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  )
}

export default HomeScreen
