import React, { useContext, useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/Header"
import Stories from "../components/stories/Stories"
import Post from "../components/posts/Post"
import Navbar from "../components/Navbar"
import { FIREBASE_AUTH, db } from "../firebase"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import useGetUser from "../contexts/UserContext"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

const HomeScreen = () => {
  const isFocused = useIsFocused()
  const { setUser } = useGetUser()
  const navigation = useNavigation()
  const currentUser = FIREBASE_AUTH.currentUser
  const [posts, setPosts] = useState([])

  const fetchUser = async () => {
    const docRef = doc(db, "users", currentUser?.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setUser(docSnap.data())
    } else {
      console.log("Unauthorized")
    }
  }

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"))
    const postList = []

    for (const document of querySnapshot.docs) {
      const post = document.data()

      const authorSnapshot = await getDoc(doc(db, "users", post.authorId))
      const authorData = authorSnapshot.data()

      const postWithAuthor = {
        id: document.id,
        ...post,
        author: authorData,
      }

      postList.push(postWithAuthor)
    }

    setPosts(postList)
  }

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        fetchUser()
      } else {
        navigation.navigate("Login")
      }
    })
  }, [currentUser])

  useEffect(() => {
    if(isFocused) {
      fetchPosts()
    }
  }, [isFocused])

  return (
    <SafeAreaView style={{ height: 100 + "%" }}>
      <Header />
      <ScrollView>
        <Stories />
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
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
