import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import * as ImagePicker from "expo-image-picker"

const CreatePost = () => {
  const [image, setImage] = useState(null)
  const handleSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <SafeAreaView>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <TouchableOpacity onPress={handleSelect}>
        <Text>Pick a photo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default CreatePost

const styles = StyleSheet.create({})
