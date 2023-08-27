import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Heart } from 'react-native-feather'


const Header = () => {
  return (
    <View style={styles.headerWrapper}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <Heart color={'#262626'}/>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'stretch'
    }
})