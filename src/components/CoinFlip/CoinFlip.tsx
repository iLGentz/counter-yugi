import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { CoinFace } from './CoinFace';
import { useCoinAnimation } from './useCoinAnimation';

type Face = 'testa' | 'croce';

export const CoinFlip: React.FC = () => {
  const [result, setResult] = useState<Face | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleDone = (face: Face) => {
    setResult(face);
    setIsFlipping(false);
  };

  const { rotateY, translateY, flip, reset } = useCoinAnimation(handleDone);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handlePress = () => {
    if (isFlipping) return;
    setResult(null);
    setIsFlipping(true);
    reset();
    flip();
  };

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={handlePress} disabled={isFlipping}>
        <Animated.View style={[styles.coinContainer, containerStyle]}>
          <CoinFace
            rotateY={rotateY}
            symbol="👑"
            label="Testa"
            gradientColors={['#f7d060', '#d4a017', '#a07008']}
          />
          <CoinFace
            rotateY={rotateY}
            isBack
            symbol="⚜️"
            label="Croce"
            gradientColors={['#e8c040', '#c49010', '#8a6000']}
          />
        </Animated.View>
      </Pressable>

      <Text style={styles.hint}>
        {isFlipping ? '...' : result ? `${result === 'testa' ? '👑' : '⚜️'} ${result.toUpperCase()}!` : 'Tocca per lanciare'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 25,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  coinContainer: {
    width: 160,
    height: 160,
  },
  hint: {
    color: '#f7d060',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
});