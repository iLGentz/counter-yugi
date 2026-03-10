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

const styles = StyleSheet.create({
    number: {
        fontSize: 100,
        fontWeight: 'bold',
        color: '#ffffffce',
    },
    container: {
        gap: 25,
        position: 'absolute',
        top: 300,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wheelWrapper: {
        alignItems: 'center',
    },
    pointer: {
        width: 0,
        height: 0,
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderTopWidth: 19,
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#ffffff',
        marginBottom: -5,
        zIndex: 10,
    },
    wheel: {
        width: WHEEL_SIZE,
        height: WHEEL_SIZE,
        borderRadius: WHEEL_SIZE / 2,
        backgroundColor: '#1a1a2e',
        borderWidth: 4,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelWrapper: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    segmentText: {
        fontSize: 44,
        fontWeight: 'bold',
        color: '#ffffff', // bianco fisso
    },
    divider: {
        position: 'absolute',
        width: 2,
        height: WHEEL_SIZE,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    centerDot: {
        position: 'absolute',
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
});
