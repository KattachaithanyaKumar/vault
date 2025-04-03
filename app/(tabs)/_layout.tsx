import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import TabIcon from "../components/TabIcon";

const HomeIcon = require("../../assets/icons/home.png");
const RecentIcon = require("../../assets/icons/recent.png");
const AddIcon = require("../../assets/icons/add.png");
const VaultIcon = require("../../assets/icons/vault.png");
const ProfileIcon = require("../../assets/icons/profile.png");

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarBackground: () => <View style={styles.tabBarBackground} />, 
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={HomeIcon} /> }} />
      <Tabs.Screen name="Recent" options={{ title: "Recent", tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={RecentIcon} /> }} />
      <Tabs.Screen name="Add" options={{ title: "Add", tabBarIcon: ({ focused }) => (
        <View style={styles.addIcon}>
          <TabIcon focused={focused} icon={AddIcon} />
        </View>
      )
       }} />
      <Tabs.Screen name="Vault" options={{ title: "Vault", tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={VaultIcon} /> }} />
      <Tabs.Screen name="Profile" options={{ title: "Profile", tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={ProfileIcon} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: 80, 
    borderTopWidth: 0,
    position: "absolute",
  },
  tabBarItem: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: "#19191b",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  addIcon: {
    position: "absolute",
    top: -60, 
    backgroundColor: "#19191b",
    borderRadius: 50,
    padding: 10,
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  }
});
