// CoinFlip.tsx
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, Pressable, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const SIZE = 250;
type Face = 'testa' | 'croce';

export interface CoinFlipHandle {
  flipTo: (face: Face) => void;
}

interface CoinFlipProps {
  onResult?: (face: Face) => void;
  testaImage: ImageSourcePropType;
  croceImage: ImageSourcePropType;
}

export const CoinFlipNew = forwardRef<CoinFlipHandle, CoinFlipProps>(
  ({ onResult, testaImage, croceImage }, ref) => {
    const [isFlipping, setIsFlipping] = useState(false);
    const isFlippingRef = useRef(false);

    const rotateY = useSharedValue(0);
    const translateY = useSharedValue(0);

    const handleDone = (face: Face) => {
      isFlippingRef.current = false;
      setIsFlipping(false);
      onResult?.(face);
    };

    const flipTo = (face: Face) => {
      if (isFlippingRef.current) return;
      isFlippingRef.current = true;
      setIsFlipping(true);

      rotateY.value = 0;
      translateY.value = 0;

      const finalAngle = face === 'testa' ? 1440 : 1620;

      translateY.value = withSequence(
        withTiming(-180, { duration: 500, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 500, easing: Easing.in(Easing.quad) })
      );

      rotateY.value = withTiming(
        finalAngle,
        { duration: 1000, easing: Easing.out(Easing.cubic) },
        (finished) => {
          if (finished) runOnJS(handleDone)(face);
        }
      );
    };

    useImperativeHandle(ref, () => ({ flipTo }));

    const handlePress = () => {
      const face: Face = Math.random() < 0.5 ? 'testa' : 'croce';
      flipTo(face);
    };

    const containerStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const testaStyle = useAnimatedStyle(() => ({
      transform: [{ perspective: 600 }, { rotateY: `${rotateY.value}deg` }],
    }));

    const croceStyle = useAnimatedStyle(() => ({
      transform: [{ perspective: 600 }, { rotateY: `${rotateY.value + 180}deg` }],
    }));

    return (
      <View style={styles.wrapper}>
        <Pressable onPress={handlePress} disabled={isFlipping}>
          <Animated.View style={[styles.coinContainer, containerStyle]}>

            {/* TESTA */}
            <Animated.View style={[styles.face, testaStyle]}>
              <Image source={testaImage} style={styles.faceImage} />
            </Animated.View>

            {/* CROCE */}
            <Animated.View style={[styles.face, croceStyle]}>
              <Image source={croceImage} style={styles.faceImage} />
            </Animated.View>

          </Animated.View>
        </Pressable>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinContainer: {
    width: SIZE,
    height: SIZE,
  },
  face: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  faceImage: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    resizeMode: 'cover',
  },
});
