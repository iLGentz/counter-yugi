import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';

interface Props {
    visible: boolean;
}

const WHEEL_SIZE = 238; // 280 * 0.85
const SEGMENTS = 6;
const LABEL_RADIUS = 81; // 95 * 0.85
const SEGMENT_COLORS = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22'];

export const DiceRoll: React.FC<Props> = ({ visible }) => {
    const [showDiceNumber, setShowDiceNumber] = useState(false);
    const [result, setResult] = useState(1);
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            setShowDiceNumber(false);
            spinValue.setValue(0);

            const randomNum = Math.floor(Math.random() * 6) + 1;
            setResult(randomNum);

            // Centro dello spicchio n = (n-1)*60 + 30 gradi dal top
            // Per portarlo al puntatore (top): 360*5 - ((n-1)*60 + 30)
            const totalRotation = 360 * 5 - ((randomNum - 1) * (360 / SEGMENTS) + 30);

            Animated.timing(spinValue, {
                toValue: totalRotation,
                duration: 3000,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished) setShowDiceNumber(true);
            });
        }
    }, [visible]);

    if (!visible) return null;

    const spin = spinValue.interpolate({
        inputRange: [0, 360 * 5],
        outputRange: ['0deg', `${360 * 5}deg`],
    });

    return (
        <View style={styles.container}>
            <View style={styles.wheelWrapper}>
                {/* Puntatore centrato sull'asse */}
                <View style={styles.pointer} />

                <Animated.View style={[styles.wheel, { transform: [{ rotate: spin }] }]}>
                    {Array.from({ length: SEGMENTS }, (_, i) => {
                        // Centro geometrico dello spicchio i
                        const angleDeg = i * (360 / SEGMENTS) + 30;
                        const angleRad = (angleDeg * Math.PI) / 180;
                        const x = Math.sin(angleRad) * LABEL_RADIUS;
                        const y = -Math.cos(angleRad) * LABEL_RADIUS;

                        return (
                            <View
                                key={i}
                                style={[styles.labelWrapper, { transform: [{ translateX: x }, { translateY: y }] }]}
                            >
                                <Text style={styles.segmentText}>
                                    {i + 1}
                                </Text>
                            </View>
                        );
                    })}

                    {[0, 60, 120].map((angle) => (
                        <View
                            key={angle}
                            style={[styles.divider, { transform: [{ rotate: `${angle}deg` }] }]}
                        />
                    ))}

                    <View style={styles.centerDot} />
                </Animated.View>
            </View>

        </View>
    );
};
import { diceRollStyles as styles } from '../styles';
