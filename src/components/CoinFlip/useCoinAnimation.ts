import { useSharedValue, withTiming, withSequence, Easing, runOnJS } from 'react-native-reanimated';

type Face = 'testa' | 'croce';

export const useCoinAnimation = (onDone: (face: Face) => void) => {
  const rotateY = useSharedValue(0);
  const translateY = useSharedValue(0);

  const flip = () => {
    const face: Face = Math.random() < 0.5 ? 'testa' : 'croce';
    // testa = multiplo di 360 (faccia dritta), croce = +180
    const base = 1440; // 4 giri completi
    const finalAngle = face === 'testa' ? base : base + 180;

    // Animazione salto
    translateY.value = withSequence(
      withTiming(-180, { duration: 500, easing: Easing.out(Easing.quad) }),
      withTiming(0,    { duration: 500, easing: Easing.in(Easing.quad) })
    );

    // Animazione spin
    rotateY.value = withTiming(
      finalAngle,
      { duration: 1000, easing: Easing.out(Easing.cubic) },
      (finished) => { if (finished) runOnJS(onDone)(face); }
    );
  };

  const reset = () => {
    rotateY.value = 0;
    translateY.value = 0;
  };

  return { rotateY, translateY, flip, reset };
};
