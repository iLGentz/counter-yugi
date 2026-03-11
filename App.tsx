import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { BackgroundGrid } from './src/components/BackgroundGrid';
import { PlayerPanel } from './src/components/PlayerPanel';
import { HistoryLog } from './src/components/HistoryLog';
import { WinnerOverlay } from './src/components/WinnerOverlay';
import { QuickTool } from './src/components/QuickTool';
import { YUGI } from './src/styles';
import { HistoryEntry } from './src/types';
import { Modal, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { DiceRoll } from './src/components/DiceRoll';
import { AntDesign } from '@expo/vector-icons';
import { CoinFlipNew, CoinFlipHandle } from './src/components/FlipCoinNew';
import { Asset } from 'expo-asset';

// Colori fissi compatibili con la palette esistente
const P1_COLOR = YUGI.goldLight;    // #F7D060
const P2_COLOR = YUGI.purpleLight;  // #A96ED4

export default function App() {
  const [p1LP, setP1LP] = useState(8000);
  const [p2LP, setP2LP] = useState(8000);
  const [p1Name, setP1Name] = useState('Player 1');
  const [p2Name, setP2Name] = useState('Player 2');
  const [showCoinFlip, setShowCoinFlip] = useState(false);
  const [showDiceRoll, setShowDiceRoll] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const coinRef = useRef<CoinFlipHandle>(null);

  const testaAsset = require('./assets/testa.png');
  const croceAsset = require('./assets/croce.png');

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

      if (newLP === 0 && oldLP !== 0) setWinner(2);
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

      if (newLP === 0 && oldLP !== 0) setWinner(1);
    }
  };

  const resetGame = () => {
    setP1LP(8000);
    setP2LP(8000);
    setHistory([]);
    setWinner(null);
  };

  useEffect(() => {
    Asset.loadAsync([testaAsset, croceAsset]).then(() => setShowCoinFlip(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <BackgroundGrid />

      <Pressable
        style={styles.settingsBtn}
        onPress={() => setIsSettingsVisible(true)}
      >
        <AntDesign name="setting" size={25} color={'#ffffff91'} />
      </Pressable>

      <QuickTool
        onCoinPress={() => {
          setShowCoinFlip(prev => !prev);
          setShowDiceRoll(false);
        }}
        onDicePress={() => {
          setShowDiceRoll(prev => !prev);
          setShowCoinFlip(false);
        }}
      />

      <View style={styles.content}>
        <PlayerPanel
          player={1}
          name={p1Name}
          lp={p1LP}
          accentColor={P1_COLOR}
          onNameChange={setP1Name}
          onApplyCustom={(val) => updateLP(1, val)}
        />

        {showCoinFlip && (
          <CoinFlipNew
            ref={coinRef}
            testaImage={testaAsset}
            croceImage={croceAsset}
            onResult={(face) => console.log(face)}
          />
        )}

        <DiceRoll visible={showDiceRoll} />

        <PlayerPanel
          player={2}
          name={p2Name}
          lp={p2LP}
          accentColor={P2_COLOR}
          onNameChange={setP2Name}
          onApplyCustom={(val) => updateLP(2, val)}
        />
      </View>

      <HistoryLog history={history} p1Color={P1_COLOR} p2Color={P2_COLOR} />

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
                  style={[styles.nameInput, { color: P1_COLOR, borderColor: P1_COLOR }]}
                  value={p1Name}
                  onChangeText={setP1Name}
                  placeholder="Nome Giocatore 1"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                />
              </View>

              <View style={styles.settingSection}>
                <TextInput
                  style={[styles.nameInput, { color: P2_COLOR, borderColor: P2_COLOR }]}
                  value={p2Name}
                  onChangeText={setP2Name}
                  placeholder="Nome Giocatore 2"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                />
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

import { appStyles as styles } from './src/styles';
