import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const vault = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white"
        }}
      >vault</Text>
    </View>
  )
}

export default vault

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19191C"
  }
})