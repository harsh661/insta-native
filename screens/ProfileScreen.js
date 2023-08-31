import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Menu } from "react-native-feather"
import Avatar from "../components/ui/Avatar"
import Navbar from "../components/Navbar"
import useGetUser from "../contexts/UserContext"
import { signOut } from "firebase/auth"
import { FIREBASE_AUTH, db } from "../firebase"
import { useNavigation } from "@react-navigation/native"
import { collection, doc, getDocs, query, where } from "firebase/firestore"

const ProfileScreen = () => {
  const navigation = useNavigation()
  const { user } = useGetUser()

  const [posts, setPosts] = useState([])

  const logOut = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        console.log("sign out successful")
        navigation.navigate("Login", { screen: "Login" })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const fetchPosts = async () => {
    const q = query(collection(db, "posts"), where("authorId", "==", user.uid))

    const querySnapshot = await getDocs(q)
    const postList = []
    querySnapshot.forEach((doc) => {
      postList.push({ id: doc.id, ...doc.data(), author: user.uid })
    })

    setPosts(postList)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (!user) return null

  return (
    <SafeAreaView style={{ height: 100 + "%" }}>
      <View style={styles.profileHeader}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{user.email}</Text>
        <Menu
          style={{ color: "#000", position: "absolute", right: 20, top: 20 }}
        />
      </View>
      <View style={styles.about}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar url={user.photoURL} size={70} />

          <View style={styles.counts}>
            <Text style={styles.countItem}>0</Text>
            <Text>Posts</Text>
          </View>
          <View style={styles.counts}>
            <Text style={styles.countItem}>0</Text>
            <Text>Followers</Text>
          </View>
          <View style={styles.counts}>
            <Text style={styles.countItem}>0</Text>
            <Text>Followings</Text>
          </View>
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>{user.displayName}</Text>
        </View>
        <View>
          <Text>{user.bio}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress={() => logOut()}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              margin: 1,
            }}
          >
            <Image style={styles.imageThumbnail} source={{ uri: item.image }} />
          </View>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />

      <Navbar />
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profileHeader: {
    position: "relative",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  about: {
    display: "flex",
    gap: 10,
    padding: 20,
  },
  counts: {
    display: "flex",
    alignItems: "center",
  },
  countItem: {
    fontSize: 20,
    fontWeight: "bold",
  },
  editButton: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "#00000050",
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    aspectRatio: 1/1
  },
})
