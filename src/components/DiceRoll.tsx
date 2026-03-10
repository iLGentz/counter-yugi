import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
interface Props {
    visible: boolean;
    onFinish: () => void;
}

export const DiceRoll: React.FC<Props> = ({ visible, onFinish }) => {
    const animRef = useRef<LottieView>(null);

    if (!visible) return null;

    return (
        <View style={styles.container}>
            <LottieView
                ref={animRef}
                source={require('../../assets/lottie/dice.lottie')}
                style={styles.animation}
                autoPlay
                loop={false}
                onAnimationFinish={onFinish}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        inset: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 200,
    },
    animation: {
        width: 300,
        height: 300,
    },
});
