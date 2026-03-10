import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { SharedValue } from 'react-native-reanimated';

const SIZE = 160;

interface Props {
  rotateY: SharedValue<number>;
  isBack?: boolean;  // tails face parte da 180deg
  symbol: string;
  label: string;
  gradientColors: [string, string, string];
}

export const CoinFace: React.FC<Props> = ({
  rotateY,
  isBack = false,
  symbol,
  label,
  gradientColors,
}) => {
  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 600 },
      { rotateY: `${rotateY.value + (isBack ? 180 : 0)}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.face, animStyle]}>
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      >
        {/* Shine spot */}
        <View style={styles.shine} />

        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.label}>{label}</Text>

        {/* Bordo metallico */}
        <View style={styles.rim} />
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  face: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backfaceVisibility: 'hidden',    // ← chiave del flip 3D
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  gradient: {
    flex: 1,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shine: {
    position: 'absolute',
    top: 10,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  symbol: {
    fontSize: 52,
  },
  label: {
    color: '#7a4f00',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 4,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  rim: {
    position: 'absolute',
    width: SIZE - 4,
    height: SIZE - 4,
    borderRadius: (SIZE - 4) / 2,
    borderWidth: 3,
    borderColor: 'rgba(255,220,80,0.5)',
  },
});
