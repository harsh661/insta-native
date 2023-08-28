import { Image } from 'react-native'
import React from 'react'

const Avatar = ({url, size=30}) => {
  const defaultImage = require('../../assets/user.png')
  return (
      <Image source={url ? {uri: url} : defaultImage} style={{width: size, height: size, borderRadius: 50}}/>
  )
}

export default Avatar