import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from '../components/ui/Avatar'
import { UserContext } from '../contexts/UserContext'

const EditProfile = ({ navigation }) => {
  const {user, setUser} = useContext(UserContext)

  if(!user) return null

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
            <Text style={{fontSize:16}}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{fontSize:16, fontWeight: 'bold'}}>Edit Profile</Text>
        <TouchableOpacity>
            <Text style={styles.boldText}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileImage}>
        <Avatar url={user?.photoURL} size={86}/>
        <Text style={styles.boldText}>Edit Profile Photo</Text>
      </View>

      <View>
        
      </View>
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    profileImage: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    boldText: {
        fontSize:16, 
        fontWeight: 'bold', 
        color: '#3797EF'
    }
})