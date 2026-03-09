import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../theme';

export const CenterDivider: React.FC = () => {
    return (
        <View style={styles.container} pointerEvents="none">
            <View style={styles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    line: {
        width: 200,
        height: '100%',
        // backgroundColor: COLORS.glassBorder,
        backgroundColor: COLORS.primaryGlow,
        opacity: 0.3,
    },
});
