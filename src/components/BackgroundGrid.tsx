import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { COLORS } from '../theme';

const GRID_SIZE = 50;

export const BackgroundGrid: React.FC = () => {
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.parallel([
                Animated.timing(translateX, {
                    toValue: GRID_SIZE,
                    duration: 20000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: GRID_SIZE,
                    duration: 20000,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();
        return () => animation.stop();
    }, [translateX, translateY]);

    const { width, height } = Dimensions.get('window');
    const cols = Math.ceil(width / GRID_SIZE) + 2;
    const rows = Math.ceil(height / GRID_SIZE) + 2;

    const verticalLines = Array.from({ length: cols }, (_, i) => (
        <View
            key={`v${i}`}
            style={[styles.line, styles.vertical, { left: i * GRID_SIZE }]}
        />
    ));

    const horizontalLines = Array.from({ length: rows }, (_, i) => (
        <View
            key={`h${i}`}
            style={[styles.line, styles.horizontal, { top: i * GRID_SIZE }]}
        />
    ));

    return (
        <Animated.View
            style={[
                styles.container,
                { transform: [{ translateX }, { translateY }] },
            ]}
            pointerEvents="none"
        >
            {verticalLines}
            {horizontalLines}
        </Animated.View>
    );
};

import { backgroundGridStyles as styles } from '../styles';
