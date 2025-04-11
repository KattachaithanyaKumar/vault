import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const add = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white"
        }}
      >add</Text>
    </View>
  )
}

export default add

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19191C"
  }
})