import { Image, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Button from "../components/Button"
import { signInWithEmailAndPassword } from "firebase/auth"
import { FIREBASE_AUTH } from "../firebase"
import { useNavigation } from "@react-navigation/native"
import useGetUser from "../contexts/UserContext"

const LoginScreen = () => {
  const navigation = useNavigation()
  const { setUser } = useGetUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleClick = () => {
    if (email.length && password.length) {
      signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then(() => {
          navigation.navigate("Home")
        })
        .catch(() => {
          setError(true)
        })
    }
  }

  const errorState = error && styles.textError

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry
        style={[styles.input, errorState]}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button onClick={handleClick} label={"Login"} />

      <View style={styles.textWrapper}>
        <Text style={styles.text}>Log in with google</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={{ color: "#00000050" }}>
          Don't have an account?{" "}
          <Text
            onPress={() => {
              navigation.navigate("Register")
            }}
            style={styles.text}
          >
            Sign up.
          </Text>
        </Text>
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
    paddingTop: 10,
  },
  text: {
    color: "#3797EF",
  },
  textError: {
    borderColor: '#f00'
  }
})
