import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import PinCode from '@/components/PinCode';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const STAGE = {
  ENTER: 'ENTER',
  SET: 'SET',
  CONFIRM: 'CONFIRM',
};

const screenHeight = Dimensions.get('window').height;

const IndexScreen = () => {
  const router = useRouter();
  const [stage, setStage] = useState<string>(STAGE.SET);
  const [tempPin, setTempPin] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [showContent, setShowContent] = useState(false);

  const logoTranslateY = useSharedValue(screenHeight / 2 - 100); 
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    (async () => {
      const savedPin = await AsyncStorage.getItem('app_pin');
      if (savedPin) setStage(STAGE.ENTER);
    })();

    // Animate logo up and fade in content
    logoTranslateY.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    }, (finished) => {
      if (finished) {
        runOnJS(setShowContent)(true);
        contentOpacity.value = withTiming(1, { duration: 400 });
      }
    });
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: logoTranslateY.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const handlePinComplete = async (enteredPin: string) => {
    setError(false);

    if (stage === STAGE.SET) {
      setTempPin(enteredPin);
      setStage(STAGE.CONFIRM);
    } else if (stage === STAGE.CONFIRM) {
      if (enteredPin === tempPin) {
        await AsyncStorage.setItem('app_pin', enteredPin);
        router.replace('/(home)/home');
      } else {
        setError(true);
        setStage(STAGE.SET);
        setTempPin('');
      }
    } else if (stage === STAGE.ENTER) {
      const savedPin = await AsyncStorage.getItem('app_pin');
      if (enteredPin === savedPin) {
        router.replace('/(home)/home');
      } else {
        setError(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/vault.png')}
        style={[styles.logo, logoStyle]}
        resizeMode="contain"
      />

      {showContent && (
        <Animated.View style={[styles.content, contentStyle]}>
          <Text style={styles.title}>
            {stage === STAGE.ENTER ? 'Enter PIN' : stage === STAGE.SET ? 'Set a PIN' : 'Confirm PIN'}
          </Text>

          <PinCode onComplete={handlePinComplete} error={error} />

          {stage === STAGE.ENTER && (
            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Your PIN Code?</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      )}
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#19191c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  content: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 20,
  },
  forgot: {
    color: 'white',
    fontWeight: '100',
    marginTop: 20,
    textAlign: 'center',
  },
});
