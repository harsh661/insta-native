import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PostHeader from './PostHeader'
import { Heart, MessageCircle, Send, Bookmark } from 'react-native-feather'

const Post = () => {
  return (
    <View style={styles.postBody}>
      <PostHeader name={'Josh Morgan'}/>
      <Image src='https://cdn.pixabay.com/photo/2023/08/06/18/55/building-8173603_960_720.jpg' style={styles.postImage} />
      <View style={styles.data}>
        <View style={styles.likes}>
            <Heart style={styles.icon}/>
            <MessageCircle style={styles.icon}/>
            <Send style={styles.icon}/>
        </View>
        <Bookmark style={styles.icon} />
      </View>
      <View style={styles.caption}>
        <Text style={styles.captionText}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, animi?</Text>
      <Text style={styles.time}>{'10 hours ago'}</Text>
      </View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
    postBody: {
        marginBottom: 20
    },
    postImage: {
        width: 100+'%',
        aspectRatio: 1/1,
        resizeMode: 'cover'
    },
    data: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    likes: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    icon: {
        color: '#000',
    },
    caption: {
        paddingHorizontal: 15
    },
    captionText: {
        fontSize: 12,
        fontWeight: '600'
    },
    time: {
      fontSize: 12,
      color: 'gray',
      paddingTop: 10
    }
})