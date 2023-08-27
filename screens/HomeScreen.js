import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/Header"
import Stories from "../components/stories/Stories"
import Post from "../components/posts/Post"
import Navbar from "../components/Navbar"

const HomeScreen = () => {
  return (
    <SafeAreaView style={{height: 100+'%'}}>
      <Header />
      <ScrollView>
        <Stories />
        <Post />
        <Post />
        <Post />
        <View style={{padding: 30, paddingBottom: 100}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>You're all caught up</Text>
        </View>
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

})
