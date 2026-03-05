import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_MONO } from '../theme';

interface Props {
    visible: boolean;
    winnerName: string;
    winnerPlayer: 1 | 2;
    onReset: () => void;
}

export const WinnerOverlay: React.FC<Props> = ({
    visible,
    winnerName,
    winnerPlayer,
    onReset,
}) => {
    const accentColor = winnerPlayer === 1 ? COLORS.primaryGlow : COLORS.secondaryGlow;

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <Text
                        style={[
                            styles.winnerText,
                            {
                                color: accentColor,
                                textShadowColor: accentColor,
                            },
                        ]}
                    >
                        {winnerName} Vince!
                    </Text>
                    <Pressable
                        style={({ pressed }) => [
                            styles.resetBtn,
                            {
                                borderColor: pressed ? COLORS.textMain : COLORS.glassBorder,
                                backgroundColor: pressed ? COLORS.glassLight : COLORS.bgDark,
                            },
                        ]}
                        onPress={onReset}
                    >
                        <Text style={styles.resetBtnText}>Nuova Partita</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: COLORS.overlay,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    winnerText: {
        fontFamily: FONT_MONO,
        fontSize: 64,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 8,
        marginBottom: 40,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 30,
        textAlign: 'center',
    },
    resetBtn: {
        borderWidth: 2,
        paddingHorizontal: 24,
        paddingVertical: 12,
        marginTop: 20,
    },
    resetBtnText: {
        color: COLORS.textMain,
        fontFamily: FONT_MONO,
        fontSize: 16,
        letterSpacing: 3,
        textTransform: 'uppercase',
    },
});
