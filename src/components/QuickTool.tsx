import React, { useRef } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { COLORS } from '../theme';
import { AntDesign } from '@expo/vector-icons';

interface Prop {
    onCoinPress: () => void;
    onDicePress: () => void;
}

export const QuickTool: React.FC<Prop> = ({ onCoinPress, onDicePress }) => {



    return (
        <View style={styles.container}>
            <View style={styles.toolSection}>
                <Pressable
                    style={styles.toolBtn}
                    onPress={onCoinPress}
                >
                    <AntDesign name="euro" size={25} color={'#ffffff91'} />
                </Pressable>
            </View>

            <View style={styles.toolSection}>
                <Pressable
                    style={styles.toolBtn}
                    onPress={onDicePress}
                >
                    <AntDesign name="mac-command" size={25} color={'#ffffff91'} />
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
    toolLabel: {
        fontSize: 20,
    },
});
