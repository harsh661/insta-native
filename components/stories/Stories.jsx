import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import UserStories from "./UserStory"
import { users } from "../../constants"
import UserStory from "./UserStory"

const Stories = () => {
  return (
    <View style={styles.storiesWrapper}>
      <ScrollView horizontal>
        <UserStory
          name={"Your Story"}
          image={"https://i.ibb.co/1Ktfx5v/user5.png"}
        />
        {users.map((user, i) => (
          <UserStory key={user.name + i} {...user} story/>
        ))}
      </ScrollView>
    </View>
  )
}

export default Stories

const styles = StyleSheet.create({
  storiesWrapper: {
    paddingVertical: 10,
    borderColor: "#00000020",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
})
