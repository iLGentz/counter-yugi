import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    Keyboard,
} from 'react-native';
import { COLORS, FONT_MONO } from '../theme';

interface Props {
    player: 1 | 2;
    name: string;
    lp: number;
    accentColor: string;
    onNameChange: (newName: string) => void;
    onApplyCustom: (amount: number) => void;
}

export const PlayerPanel: React.FC<Props> = ({
    player,
    name,
    lp,
    accentColor,
    onNameChange,
    onApplyCustom,
}) => {
    const [inputValue, setInputValue] = useState('');
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const isLowHP = lp > 0 && lp <= 2000;

    useEffect(() => {
        if (isLowHP) {
            const pulse = Animated.loop(
                Animated.sequence([
                    Animated.parallel([
                        Animated.timing(pulseAnim, {
                            toValue: 1.05,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                        Animated.timing(opacityAnim, {
                            toValue: 0.7,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.parallel([
                        Animated.timing(pulseAnim, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                        Animated.timing(opacityAnim, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                    ]),
                ])
            );
            pulse.start();
            return () => pulse.stop();
        } else {
            pulseAnim.setValue(1);
            opacityAnim.setValue(1);
        }
    }, [isLowHP, pulseAnim, opacityAnim]);

    const handleEditName = () => {
        if (Platform.OS === 'ios') {
            Alert.prompt(
                'Nome Giocatore',
                `Inserisci il nome per ${name}:`,
                (text) => {
                    if (text && text.trim()) onNameChange(text.trim());
                },
                'plain-text',
                name
            );
        } else {
            // On Android, Alert.prompt is not available; use a simple alert as fallback
            Alert.alert('Nome Giocatore', `Nome attuale: ${name}`);
        }
    };

    const handleApply = (isAdd: boolean) => {
        Keyboard.dismiss();
        const value = parseInt(inputValue, 10);
        if (!isNaN(value) && value > 0) {
            onApplyCustom(isAdd ? value : -value);
            setInputValue('');
        }
    };

    const screenHeight = Dimensions.get('window').height;
    const lpFontSize = screenHeight < 500 ? 60 : 90;

    return (
        <View
            style={[
                styles.panel,
                player === 1 ? styles.player1Panel : styles.player2Panel,
            ]}
        >
            {/* Player Name */}
            <Pressable onPress={handleEditName}>
                <Text style={[styles.playerName, { color: accentColor }]}>{name}</Text>
            </Pressable>

            {/* LP Display */}
            <View style={styles.lpContainer}>
                <Text style={[styles.lpLabel, { color: accentColor }]}>LP</Text>
                <Animated.Text
                    style={[
                        styles.lpDisplay,
                        {
                            color: accentColor,
                            fontSize: lpFontSize,
                            textShadowColor: accentColor,
                            transform: [{ scale: pulseAnim }],
                            opacity: opacityAnim,
                        },
                    ]}
                >
                    {lp}
                </Animated.Text>
            </View>

            {/* Custom Input */}

            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, { borderColor: accentColor, color: accentColor }]}
                    value={inputValue}
                    onChangeText={setInputValue}
                    keyboardType="number-pad"
                    placeholder="Custom"
                    placeholderTextColor={COLORS.textDim}
                    returnKeyType="done"
                    onSubmitEditing={() => handleApply(true)}
                />
                <Pressable
                    style={({ pressed }) => [
                        styles.btn,
                        { borderColor: accentColor, opacity: pressed ? 0.7 : 1 },
                    ]}
                    onPressIn={() => handleApply(true)}
                >
                    <Text style={[styles.btnText, { color: accentColor }]}>+</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.btn,
                        { borderColor: accentColor, opacity: pressed ? 0.7 : 1 },
                    ]}
                    onPressIn={() => handleApply(false)}
                >
                    <Text style={[styles.btnText, { color: accentColor }]}>−</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    panel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    player1Panel: {
        // borderRightWidth: 2,
        // borderRightColor: 'rgba(0, 212, 255, 0.3)',
    },
    player2Panel: {
        // borderLeftWidth: 2,
        // borderLeftColor: 'rgba(255, 0, 110, 0.3)',
    },
    playerName: {
        fontFamily: FONT_MONO,
        fontSize: 38,
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginBottom: 16,
        opacity: 0.8,
    },
    lpContainer: {
        alignItems: 'center',
        marginVertical: 50,
    },
    lpLabel: {
        fontFamily: FONT_MONO,
        fontSize: 14,
        letterSpacing: 3,
        opacity: 0.5,
        marginBottom: 4,
    },
    lpDisplay: {
        fontFamily: FONT_MONO,
        fontWeight: 'bold',
        minWidth: 350,
        textAlign: 'center',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 20,
    },
    input: {
        backgroundColor: COLORS.glassLight,
        borderWidth: 2,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 18,
        fontFamily: FONT_MONO,
        width: 130,
        textAlign: 'center',
    },
    btn: {
        backgroundColor: COLORS.glassLight,
        borderWidth: 2,
        paddingHorizontal: 22,
        paddingVertical: 10,
        minWidth: 56,
        alignItems: 'center',
    },
    btnText: {
        fontFamily: FONT_MONO,
        fontSize: 22,
        fontWeight: 'bold',
    },
});
