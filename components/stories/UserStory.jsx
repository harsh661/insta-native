import { Image, StyleSheet, Text, View } from "react-native"
import React from "react"

const UserStory = ({ name, photoURL, story }) => {
  const isActive = story && styles.withBorder
  const defaultImage = require('../../assets/user.png')

  return (
    <View style={styles.storyWrapper}>
      <Image source={photoURL ? {uri: photoURL} : defaultImage} style={[styles.image, isActive]} />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{name}</Text>
    </View>
  )
}

export default UserStory

const styles = StyleSheet.create({
  storyWrapper: {
    paddingLeft: 15,
    display: "flex",
    alignItems: "center",
    gap: 5,
    width: 85,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    width: 85,
    textAlign: 'center'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  withBorder: {
    borderWidth: 3,
    borderColor: "#c90083",
  },
})
