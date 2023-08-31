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
import { db, storage } from "../firebase"
import "firebase/storage"
import * as ImagePicker from "expo-image-picker"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import getDownloadLink from "../libs/getDownloadLink"

const EditProfile = ({ navigation }) => {
  const { user, setUser } = useGetUser()
  const [name, setName] = useState(user.displayName)
  const [bio, setBio] = useState(user.bio)
  const [image, setImage] = useState(null)

  const handleSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      try {
        const downloadURL = await getDownloadLink(result.assets[0].uri, 'images')
        setImage(downloadURL)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const updateProfile = async () => {
    await updateDoc(doc(db, "users", user.uid), {
      displayName: name,
      bio: bio,
      photoURL: image,
    })
    setUser((prev) => ({
      ...prev,
      displayName: name,
      bio: bio,
      photoURL: image,
    }))
    navigation.navigate("Profile")
  }

  if (!user) return

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
        <Avatar url={!image ? user?.photoURL : image} size={86} />
        <Text onPress={handleSelect} style={styles.boldText}>
          Edit Profile Photo
        </Text>
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
