import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import Stories from '../components/stories/Stories'

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Header/>
      <Stories />
      <Text>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})