import React, { useState, useRef } from 'react';
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { COLORS, FONT_MONO } from '../theme';
import { CoinFlip } from './CoinFlip';

interface Prop{
    onCoinPress: () => void;
    onDicePress: () => void;
}

export const QuickTools: React.FC<Prop> = ({onCoinPress , onDicePress}) => {
    const [diceResult, setDiceResult] = useState<number | null>(null);
    const [coinResult, setCoinResult] = useState<'T' | 'C' | null>(null);
    const [isRollingDice, setIsRollingDice] = useState(false);
    const [isFlippingCoin, setIsFlippingCoin] = useState(false);

    const diceAnim = useRef(new Animated.Value(0)).current;
    const coinAnim = useRef(new Animated.Value(0)).current;

    const rollDice = () => {
        if (isRollingDice) return;
        setIsRollingDice(true);
        setDiceResult(null);

        // Animation sequence
        diceAnim.setValue(0);
        Animated.timing(diceAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start(() => {
            const result = Math.floor(Math.random() * 6) + 1;
            setDiceResult(result);
            setIsRollingDice(false);
        });

        // Interval to show random numbers during "roll"
        let count = 0;
        const interval = setInterval(() => {
            setDiceResult(Math.floor(Math.random() * 6) + 1);
            count++;
            if (count > 10) clearInterval(interval);
        }, 70);
    };

    const flipCoin = () => {
        if (isFlippingCoin) return;
        setIsFlippingCoin(true);
        setCoinResult(null);

        coinAnim.setValue(0);
        Animated.timing(coinAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start(() => {
            const result = Math.random() > 0.5 ? 'T' : 'C';
            setCoinResult(result);
            setIsFlippingCoin(false);
        });

        let count = 0;
        const interval = setInterval(() => {
            setCoinResult(Math.random() > 0.5 ? 'T' : 'C');
            count++;
            if (count > 10) clearInterval(interval);
        }, 70);
    };

    const diceRotate = diceAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg'],
    });

    const coinScale = coinAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.5, 1],
    });

    return (
        <View style={styles.container}>
            <View style={styles.toolSection}>
                <Pressable
                    style={({ pressed }) => [
                        styles.toolBtn,
                        { opacity: pressed || isRollingDice ? 0.7 : 1 }
                    ]}
                    onPress={onCoinPress}
                >
                    <Text style={{ color: "red" }}>moneta</Text>
                </Pressable>

            </View>

            <View style={styles.toolSection}>
                <Pressable
                    style={({ pressed }) => [
                        styles.toolBtn,
                        { opacity: pressed || isFlippingCoin ? 0.7 : 1 }
                    ]}
                    onPress={onDicePress}
                >
                    <Text style={{ color: "red" }}>dado</Text>

                </Pressable>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 100,
        flexDirection: 'row',
        gap: 15,
    },
    toolSection: {
        alignItems: 'center',
    },
    toolBtn: {
        backgroundColor: COLORS.glassLight,
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 24,
    },
    resultBadge: {
        position: 'absolute',
        bottom: -15,
        backgroundColor: COLORS.primaryGlow,
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        minWidth: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
    },
    resultText: {
        color: COLORS.bgDark,
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: FONT_MONO,
    },
});
