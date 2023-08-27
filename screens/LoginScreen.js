import { Image, StyleSheet, Text, TextInput, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Button from "../components/Button"

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" />
      <Button label={"Login"} />
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Log in with google</Text>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    height: 100 + "%",
    padding: 20,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 100 + "%",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#00000010",
    backgroundColor: "#FAFAFA",
  },
  image: {
    width: 180,
    height: 80,
    resizeMode: "stretch",
  },
  textWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    paddingTop: 10
  }, 
  text: {
    color: '#3797EF'
  }
})
