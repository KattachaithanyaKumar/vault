import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from "expo-status-bar"

const MainLayout = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
      <StatusBar style='light' />
        <View style={styles.safeArea}>
          <Stack screenOptions={{headerShown: false}}>
          </Stack>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default MainLayout

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#111113"
  }
})