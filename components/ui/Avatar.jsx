import { Image } from 'react-native'
import React from 'react'

const Avatar = ({url, size=30}) => {
  return (
      <Image src={url} style={{width: size, height: size, borderRadius: 50}}/>
  )
}

export default Avatar