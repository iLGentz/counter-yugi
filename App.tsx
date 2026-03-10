import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { BackgroundGrid } from './src/components/BackgroundGrid';
import { PlayerPanel } from './src/components/PlayerPanel';
import { HistoryLog } from './src/components/HistoryLog';
import { WinnerOverlay } from './src/components/WinnerOverlay';
import { COLORS } from './src/theme';
import { HistoryEntry } from './src/types';
import { Modal, Text, Pressable, ScrollView, TextInput } from 'react-native';

const COLOR_OPTIONS = [
  '#00d4ff', // Cyan
  '#ff006e', // Pink
  '#4ade80', // Green
  '#facc15', // Yellow
  '#c084fc', // Purple
  '#fb923c', // Orange
  '#ffffff', // White
];

export default function App() {
  const [p1LP, setP1LP] = useState(8000);
  const [p2LP, setP2LP] = useState(8000);
  const [p1Name, setP1Name] = useState('Player 1');
  const [p2Name, setP2Name] = useState('Player 2');
  const [p1Color, setP1Color] = useState<string>(COLORS.primaryGlow);
  const [p2Color, setP2Color] = useState<string>(COLORS.secondaryGlow);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

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
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <BackgroundGrid />

      <Pressable
        style={styles.settingsBtn}
        onPress={() => setIsSettingsVisible(true)}
      >
        <Text style={styles.settingsIcon}>⚙️</Text>
      </Pressable>
      <View style={styles.content}>
        <PlayerPanel
          player={1}
          name={p1Name}
          lp={p1LP}
          accentColor={p1Color}
          onNameChange={setP1Name}
          onApplyCustom={(val) => updateLP(1, val)}

        />

        <PlayerPanel
          player={2}
          name={p2Name}
          lp={p2LP}
          accentColor={p2Color}
          onNameChange={setP2Name}
          onApplyCustom={(val) => updateLP(2, val)}
        />

      </View>
      <HistoryLog history={history} />

      <Modal
        visible={isSettingsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSettingsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Impostazioni</Text>

            <ScrollView style={{ width: '100%' }}>
              <View style={styles.settingSection}>
                <TextInput
                  style={[styles.nameInput, { color: p1Color, borderColor: p1Color }]}
                  value={p1Name}
                  onChangeText={setP1Name}
                  placeholder="Nome Giocatore 1"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                />
                <View style={styles.colorGrid}>
                  {COLOR_OPTIONS.map(color => (
                    <Pressable
                      key={color}
                      style={[
                        styles.colorCircle,
                        { backgroundColor: color, borderColor: p1Color === color ? '#fff' : 'transparent' }
                      ]}
                      onPress={() => setP1Color(color)}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.settingSection}>
                <TextInput
                  style={[styles.nameInput, { color: p2Color, borderColor: p2Color }]}
                  value={p2Name}
                  onChangeText={setP2Name}
                  placeholder="Nome Giocatore 2"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                />
                <View style={styles.colorGrid}>
                  {COLOR_OPTIONS.map(color => (
                    <Pressable
                      key={color}
                      style={[
                        styles.colorCircle,
                        { backgroundColor: color, borderColor: p2Color === color ? '#fff' : 'transparent' }
                      ]}
                      onPress={() => setP2Color(color)}
                    />
                  ))}
                </View>
              </View>
            </ScrollView>

            <Pressable
              style={styles.closeBtn}
              onPress={() => setIsSettingsVisible(false)}
            >
              <Text style={styles.closeBtnText}>Chiudi</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
  settingsBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 100,
    padding: 10,
    backgroundColor: COLORS.glassLight,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  settingsIcon: {
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: COLORS.bgPanel,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingSection: {
    width: '100%',
    marginBottom: 30,
  },
  nameInput: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textTransform: 'uppercase',
    borderBottomWidth: 2,
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
  },
  closeBtn: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: COLORS.glassLight,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
