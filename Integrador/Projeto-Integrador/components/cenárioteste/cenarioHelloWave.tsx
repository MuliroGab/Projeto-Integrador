import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText'; // Certifique-se de que o caminho está correto

const HelloWave = () => {
  const animatedValue = new Animated.Value(0);

  const animatedStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={animatedStyle} testID="animated-view">
      <ThemedText style={styles.text}>👋</ThemedText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default HelloWave;
