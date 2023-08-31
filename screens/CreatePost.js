import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import * as ImagePicker from "expo-image-picker"
import { useNavigation } from "@react-navigation/native"
import useGetUser from "../contexts/UserContext.jsx"
import * as Icon from "react-native-feather"
import getDownloadLink from "../libs/getDownloadLink"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from '../firebase.js'

const CreatePost = () => {
  const [image, setImage] = useState(null)
  const navigation = useNavigation()
  const { user } = useGetUser()
  const [caption, setCaption] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      try {
        const downloadUrl = await getDownloadLink(result.assets[0].uri, "posts")
        setImage(downloadUrl)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const createPost = async () => {
    if (!image && !caption.length ) return
    setLoading(true)

    const post = {
      author: user,
      image: image,
      caption: caption,
      createdAt: serverTimestamp()
    }
    await addDoc(collection(db, "posts"), post);
    setLoading(false)
    navigation.navigate('Home')
  }

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 16 }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Create Post</Text>
        <TouchableOpacity onPress={createPost}>
          <Text style={styles.boldText}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 100 + "%",
              height: 100 + "%",
              position: "absolute",
              top: 0,
            }}
          />
        )}
        <TouchableOpacity onPress={handleSelect}>
          <Icon.Image style={styles.boldText} />
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Write a caption..."
          value={caption}
          onChangeText={(text) => setCaption(text)}
        />
      </View>
    </SafeAreaView>
  )
}

export default CreatePost

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  imageContainer: {
    position: "relative",
    width: 100 + "%",
    height: "auto",
    aspectRatio: 1 / 1,
    backgroundColor: "#00000010",
    alignItems: "center",
    justifyContent: "center",
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3797EF",
  },
  input: {
    padding: 10,
    margin: 10,
    borderColor: "#00000050",
    borderWidth: 1,
    borderRadius: 10,
  },
})
