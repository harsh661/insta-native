import { ScrollView, StyleSheet, Text, View } from "react-native"
import React, { useContext } from "react"
import UserStories from "./UserStory"
import { users } from "../../constants"
import UserStory from "./UserStory"
import { UserContext } from "../../contexts/UserContext"

const Stories = () => {
  const currentUser = useContext(UserContext)
  return (
    <View style={styles.storiesWrapper}>
      <ScrollView horizontal>
        <UserStory
          name={"Your Story"}
          image={currentUser.photoURL}
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
