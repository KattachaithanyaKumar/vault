import { StyleSheet, View, Pressable } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const _layout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarButton: (props) => (
          <Pressable
            {...props}
            android_ripple={null}
            style={({ pressed }) => ({
              opacity: 1, 
              alignItems: 'center',
              justifyContent: 'center',
              width: 70,
              height: 70,
            })}
          />
        ),
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Feather.glyphMap = 'home';
          let iconColor = focused ? '#ffffff' : '#999999';
          let iconSize = 24;
          const isAdd = route.name === 'add';

          switch (route.name) {
            case 'home':
              iconName = 'home';
              break;
            case 'recent':
              iconName = 'clock';
              break;
            case 'add':
              iconName = 'plus';
              iconColor = '#ffffff';
              iconSize = 28;
              break;
            case 'vault':
              iconName = 'lock';
              break;
            case 'profile':
              iconName = 'user';
              break;
          }

          if (isAdd) {
            return (
              <View style={styles.addButtonContainer}>
                <View style={styles.addButton}>
                  <Feather name={iconName} size={iconSize} color={iconColor} />
                </View>
              </View>
            );
          }

          return (
            <View style={styles.iconWrapper}>
              <Feather name={iconName} size={iconSize} color={iconColor} />
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="recent" />
      <Tabs.Screen name="add" />
      <Tabs.Screen name="vault" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#242424',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 10,
  },
  iconWrapper: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  addButton: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#4da6ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    borderWidth: 10,
    borderColor: '#19191c',
  },
});
