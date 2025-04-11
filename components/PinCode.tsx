import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const items = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '<'];

type PinCodeProps = {
  onComplete: (pin: string) => void;
  disabled?: boolean;
  error?: boolean;
};

const PinCode = ({ onComplete, disabled = false, error = false }: PinCodeProps) => {
  const [pin, setPin] = useState<string>('');
  const shake = useSharedValue(0);

  useEffect(() => {
    if (pin.length === 4) {
      setTimeout(() => {
        onComplete(pin);
        setPin('');
      }, 200);
    }
  }, [pin]);

  useEffect(() => {
    if (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      shake.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withRepeat(withTiming(10, { duration: 100 }), 4, true),
        withTiming(0, { duration: 50 })
      );
    }
  }, [error]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shake.value }],
    };
  });

  const handleClick = (key: string) => {
    if (disabled) return;

    if (key === '<') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setPin((prev) => prev.slice(0, -1));
    } else if (key === '*') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setPin('');
    } else {
      if (pin.length < 4) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setPin((prev) => prev + key);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.pinDisplay, animatedStyle]}>
        <View style={styles.pinDots}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Text
              key={index}
              style={[styles.pinText, { color: index < pin.length ? '#75A8F3' : 'white' }]}
            >
              {index < pin.length ? '●' : '○'}
            </Text>
          ))}
        </View>
      </Animated.View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handleClick(item)}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          numColumns={3}
        />
      </View>
    </View>
  );
};

export default PinCode;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  pinDisplay: {
    alignItems: 'center',
    marginVertical: 20,
  },
  pinDots: {
    flexDirection: 'row',
    gap: 12,
  },
  pinText: {
    fontSize: 38,
    letterSpacing: 12,
  },
  item: {
    width: 60,
    height: 60,
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  itemText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
});
