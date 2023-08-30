import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Avatar from "../components/ui/Avatar"
import useGetUser from "../contexts/UserContext"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

const EditProfile = ({ navigation }) => {
  const { user, setUser } = useGetUser()
  const [name, setName] = useState(user.displayName)
  const [bio, setBio] = useState(user.bio)

  if (!user) return

  const updateProfile = async() => {
    await updateDoc(doc(db, "users", user.uid), {
      displayName: name,
      bio: bio
    })
    setUser(prev => ({...prev, displayName: name, bio: bio}))
    navigation.navigate('Profile')
  }

  return (
    <SafeAreaView style={{ paddingHorizontal: 15 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={{ fontSize: 16 }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Edit Profile</Text>
        <TouchableOpacity onPress={updateProfile}>
          <Text style={styles.boldText}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileImage}>
        <Avatar url={user?.photoURL} size={86} />
        <Text style={styles.boldText}>Edit Profile Photo</Text>
      </View>

      <View style={styles.input}>
        <Text style={[styles.text, { flex: 1 }]}>Name</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={[styles.text, { flex: 3 }]}
        />
      </View>
      <View style={styles.input}>
        <Text style={[styles.text, { flex: 1 }]}>Bio</Text>
        <TextInput
          style={[styles.text, { flex: 3 }]}
          value={bio}
          onChangeText={(text) => setBio(text)}
          placeholder="Write something about you"
        />
      </View>
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  profileImage: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3797EF",
  },
  input: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
  },
})
