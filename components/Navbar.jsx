import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useContext } from "react"
import { Heart, Home, Search, PlusSquare } from "react-native-feather"
import Avatar from "./ui/Avatar"
import { UserContext } from "../contexts/UserContext"
import { useNavigation } from "@react-navigation/native"

const Navbar = () => {
  const navigation = useNavigation()
  const { user } = useContext(UserContext)
  return (
    <View style={styles.navWrapper}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Home style={styles.icon}/>
      </TouchableOpacity>
      <Search style={styles.icon} />
      <PlusSquare style={styles.icon} />
      <Heart style={styles.icon} />
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Avatar url={user?.displayImage} size={24} />
      </TouchableOpacity>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
  navWrapper: {
    position: "absolute",
    bottom: 0,
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: 100 + "%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderColor: "#00000020",
  },
  icon: {
    color: "#000",
  },
})
