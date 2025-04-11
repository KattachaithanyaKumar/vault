import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const recent = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white"
        }}
      >recent</Text>
    </View>
  )
}

export default recent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19191c",
  }
})