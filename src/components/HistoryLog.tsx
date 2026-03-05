import React from 'react';
import { FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';
import { COLORS, FONT_MONO } from '../theme';
import { HistoryEntry } from '../types';

interface Props {
    history: HistoryEntry[];
}

export const HistoryLog: React.FC<Props> = ({ history }) => {
    const renderItem = ({ item }: { item: HistoryEntry }) => {
        const isP1 = item.player === 1;
        const accentColor = isP1 ? COLORS.primaryGlow : COLORS.secondaryGlow;

        return (
            <View style={[styles.item, isP1 ? styles.p1Item : styles.p2Item]}>
                <Text style={[styles.playerName, { color: accentColor }]}>
                    {item.playerName}
                </Text>
                <Text
                    style={[
                        styles.change,
                        { color: item.change > 0 ? COLORS.positive : COLORS.negative },
                    ]}
                >
                    {item.change > 0 ? `+${item.change}` : item.change}
                </Text>
                <Text style={styles.arrow}>←</Text>
                <Text style={[styles.prevLP, { color: accentColor }]}>{item.prevLP}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={history}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                inverted
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        marginLeft: -250, // Center manually for fixed width
        width: 500,
        height: 150,
        backgroundColor: COLORS.glassLight,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        padding: 10,
        zIndex: 5,
    },
    listContent: {
        paddingBottom: 0,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 6,
        borderLeftWidth: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },
    p1Item: {
        borderLeftColor: COLORS.primaryGlow,
    },
    p2Item: {
        borderLeftColor: COLORS.secondaryGlow,
    },
    playerName: {
        fontFamily: FONT_MONO,
        fontSize: 14,
        width: 100,
        textTransform: 'uppercase',
    },
    change: {
        fontFamily: FONT_MONO,
        fontSize: 16,
        fontWeight: 'bold',
        width: 80,
        textAlign: 'center',
    },
    arrow: {
        color: COLORS.textDim,
        fontSize: 14,
        marginHorizontal: 10,
    },
    prevLP: {
        fontFamily: FONT_MONO,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
