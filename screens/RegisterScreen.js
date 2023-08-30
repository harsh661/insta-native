import { Image, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Button from "../components/Button"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { FIREBASE_AUTH, db } from "../firebase"
import { useNavigation } from "@react-navigation/native"
import { doc, setDoc } from "firebase/firestore"
import useGetUser from "../contexts/UserContext.jsx"

const RegisterScreen = () => {
  const navigation = useNavigation()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)

    if (name.length && email.length && password.length) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          email,
          password
        )
        const user = userCredentials.user

        await Promise.all([
          updateProfile(user, {
            displayName: name,
          }),
          setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: name,
            email: user.email,
            photoURL: user.photoURL,
            bio: "",
            followers: 0,
            followings: 0,
          }),
        ])

        navigation.navigate("Home")
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button onClick={handleClick} label={"Register"} />

      <View style={styles.textWrapper}>
        <Text style={styles.text}>Log in with google</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={{ color: "#00000050" }}>
          Already have an account?{" "}
          <Text
            onPress={() => {
              navigation.navigate("Login")
            }}
            style={styles.text}
          >
            Log in.
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen

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
    paddingTop: 10,
  },
  text: {
    color: "#3797EF",
  },
})
