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

import { quickToolStyles as styles } from '../styles';
