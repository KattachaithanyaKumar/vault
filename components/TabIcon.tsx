import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

interface Props {
  focused: boolean;
  icon: any; 
}

const TabIcon = ({ focused, icon }: Props) => {
  return (
    <View style={[styles.container, focused && styles.focusedContainer]}>
      <Image source={icon} style={[styles.icon, focused && styles.focusedIcon]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 100,
    width: 54,
    height: 54,
  },
  focusedContainer: {
    backgroundColor: "#2d2d30",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#686868",
  },
  focusedIcon: {
    tintColor: "#fff", 
  },
  text: {
    fontSize: 12,
    color: "#bbb",
    marginTop: 4,
  },
  focusedText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TabIcon;
