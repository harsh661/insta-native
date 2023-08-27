import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Avatar from '../ui/Avatar.jsx'

const PostHeader = ({url, name}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.user}>
        <Avatar url={'https://i.ibb.co/C2LZS7J/user2.png'}/>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  )
}

export default PostHeader

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    user: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
    }
})