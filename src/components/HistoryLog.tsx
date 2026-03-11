import React from 'react';
import { FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';
import { COLORS, FONT_MONO } from '../theme';
import { HistoryEntry } from '../types';


interface Props {
    history: HistoryEntry[];
    p1Color: string;
    p2Color: string;
}

export const HistoryLog: React.FC<Props> = ({ history, p1Color, p2Color }) => {
    const renderItem = ({ item }: { item: HistoryEntry }) => {
        const isP1 = item.player === 1;
        const accentColor = isP1 ? p1Color : p2Color;

        return (
            <View style={[styles.item, { borderLeftColor: accentColor }]}>
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
import { historyLogStyles as styles } from '../styles';
