import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Heart, Home, Search, PlusSquare } from 'react-native-feather'
import Avatar from './ui/Avatar'

const Navbar = () => {
  return (
    <View style={styles.navWrapper}>
      <Home style={styles.icon}/>
      <Search style={styles.icon} />
      <PlusSquare style={styles.icon} />
      <Heart style={styles.icon} />
      <Avatar url={'https://i.ibb.co/C2LZS7J/user2.png'} size={24}/>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    navWrapper: {
        position: 'absolute',
        bottom: 0,
        paddingTop: 15,
        paddingBottom: 20,
        paddingHorizontal: 20,
        width: 100+'%',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0.5,
        borderColor: '#00000020'
    },
    icon: {
        color: '#000'
    }
})