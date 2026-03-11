import React, { useEffect, useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

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
                //player === 1 ? styles.player1Panel : styles.player2Panel,
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

            <View style={styles.controlsContainer}>


                <TextInput
                    style={[styles.input, { borderColor: accentColor, color: accentColor }]}
                    value={inputValue}
                    onChangeText={setInputValue}
                    keyboardType="number-pad"
                    placeholderTextColor={COLORS.textDim}
                    returnKeyType="done"
                    onSubmitEditing={() => handleApply(true)}
                    autoCapitalize='none'
                    selectionColor="transparent"

                />
                <View style={styles.buttonsRow}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.btn,
                            { borderColor: accentColor, opacity: pressed ? 0.7 : 1 },
                        ]}
                        onPressIn={() => handleApply(true)}
                    >
                        <AntDesign name="plus" size={20} color={accentColor} />
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.btn,
                            { borderColor: accentColor, opacity: pressed ? 0.7 : 1 },
                        ]}
                        onPressIn={() => handleApply(false)}
                    >
                        <AntDesign name="minus" size={20} color={accentColor} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

import { playerPanelStyles as styles } from '../styles';
