import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PostHeader from './PostHeader'
import { Heart, MessageCircle, Send, Bookmark } from 'react-native-feather'
import TimeAgo from 'react-native-timeago';

const Post = ({ author, caption, createdAt, image, likes, comments }) => {
  return (
    <View style={styles.postBody}>
      <PostHeader url={author.photoURL} name={author.displayName}/>
      <Image source={{uri: image}} style={styles.postImage} />
      <View style={styles.data}>
        <View style={styles.likes}>
            <Heart style={styles.icon}/>
            <MessageCircle style={styles.icon}/>
            <Send style={styles.icon}/>
        </View>
        <Bookmark style={styles.icon} />
      </View>
      <View style={styles.caption}>
        <Text style={[styles.captionText, {marginBottom: 10}]}>{likes} likes</Text>
        <Text style={styles.captionText}>{caption}</Text>
        <TimeAgo style={styles.time} time={createdAt.toDate()}/>
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
        fontSize: 14,
        fontWeight: '600'
    },
    time: {
      fontSize: 12,
      color: 'gray',
      paddingTop: 10
    }
})