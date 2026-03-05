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
        width: 2,
        height: '100%',
        backgroundColor: COLORS.glassBorder,
        opacity: 0.3,
    },
});
