import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import { BackgroundGrid } from './src/components/BackgroundGrid';
import { PlayerPanel } from './src/components/PlayerPanel';
import { HistoryLog } from './src/components/HistoryLog';
import { WinnerOverlay } from './src/components/WinnerOverlay';
import { COLORS } from './src/theme';
import { HistoryEntry } from './src/types';

export default function App() {
  const [p1LP, setP1LP] = useState(8000);
  const [p2LP, setP2LP] = useState(8000);
  const [p1Name, setP1Name] = useState('Player 1');
  const [p2Name, setP2Name] = useState('Player 2');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [winner, setWinner] = useState<1 | 2 | null>(null);

  const updateLP = (player: 1 | 2, amount: number) => {
    if (player === 1) {
      const oldLP = p1LP;
      const newLP = Math.max(0, p1LP + amount);
      setP1LP(newLP);

      if (amount !== 0) {
        const entry: HistoryEntry = {
          player: 1,
          playerName: p1Name,
          change: amount,
          prevLP: oldLP,
          newLP: newLP,
        };
        setHistory(prev => [entry, ...prev].slice(0, 15));
      }

      if (newLP === 0 && oldLP !== 0) {
        setWinner(2);
      }
    } else {
      const oldLP = p2LP;
      const newLP = Math.max(0, p2LP + amount);
      setP2LP(newLP);

      if (amount !== 0) {
        const entry: HistoryEntry = {
          player: 2,
          playerName: p2Name,
          change: amount,
          prevLP: oldLP,
          newLP: newLP,
        };
        setHistory(prev => [entry, ...prev].slice(0, 15));
      }

      if (newLP === 0 && oldLP !== 0) {
        setWinner(1);
      }
    }
  };

  const resetGame = () => {
    setP1LP(8000);
    setP2LP(8000);
    setHistory([]);
    setWinner(null);
    setP1Name('Player 1');
    setP2Name('Player 2');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <BackgroundGrid />

      <View style={styles.content}>
        <PlayerPanel
          player={1}
          name={p1Name}
          lp={p1LP}
          onNameChange={setP1Name}
          onApplyCustom={(val) => updateLP(1, val)}
        />

        <PlayerPanel
          player={2}
          name={p2Name}
          lp={p2LP}
          onNameChange={setP2Name}
          onApplyCustom={(val) => updateLP(2, val)}
        />
      </View>


      <HistoryLog history={history} />

      <WinnerOverlay
        visible={winner !== null}
        winnerName={winner === 1 ? p1Name : p2Name}
        winnerPlayer={winner === 1 ? 1 : 2}
        onReset={resetGame}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
});
