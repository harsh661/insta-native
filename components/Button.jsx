import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({ label, onClick, disabled }) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onClick} style={[styles.button, disabled && {opacity: 0.5}]}>
        <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#3797EF',
        width: 100+'%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    text: {
        color: 'white'
    }
})