
import { StyleSheet } from 'react-native';
import { FONT_MONO } from './theme';

// ─── Palette Yugi ────────────────────────────────────────
export const YUGI = {
  goldLight: '#F7D060',
  gold: '#D4A017',
  goldDark: '#8A6000',
  bronze: '#C8922A',
  bgDeep: '#0D0700',       // nero egizio profondo
  bgMid: '#1A0F00',       // marrone scurissimo
  bgPanel: '#120A00',
  glassGold: 'rgba(212, 160, 23, 0.10)',
  glassBorder: 'rgba(247, 208, 96, 0.30)',
  rimGold: 'rgba(255, 220, 80, 0.45)',
  purple: '#7B3FA8',
  purpleLight: '#A96ED4',
  textMain: '#F7D060',
  textDim: 'rgba(247, 208, 96, 0.4)',
  positive: '#4ade80',
  negative: '#FF4040',
  danger: '#FF4040',
  overlay: 'rgba(0, 0, 0, 0.88)',
};

const COIN_SIZE = 250;
const WHEEL_SIZE = 238;

// ─── App ────────────────────────────────────────────────
export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: YUGI.bgDeep,
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
    backgroundColor: YUGI.glassGold,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: YUGI.glassBorder,
  },
  settingsIcon: {
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: YUGI.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: YUGI.bgPanel,
    borderRadius: 4,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: YUGI.glassBorder,
  },
  modalTitle: {
    color: YUGI.goldLight,
    fontFamily: FONT_MONO,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 4,
    textTransform: 'uppercase',
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
    borderBottomWidth: 1,
    borderBottomColor: YUGI.glassBorder,
    paddingVertical: 5,
    color: YUGI.goldLight,
    fontFamily: FONT_MONO,
  },
  sectionTitle: {
    color: YUGI.bronze,
    fontFamily: FONT_MONO,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 4,
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
    backgroundColor: YUGI.glassGold,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: YUGI.glassBorder,
  },
  closeBtnText: {
    color: YUGI.goldLight,
    fontFamily: FONT_MONO,
    fontSize: 16,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
});

// ─── PlayerPanel ─────────────────────────────────────────
export const playerPanelStyles = StyleSheet.create({
  panel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  topRim: {
    position: 'absolute',
    top: 12,
    width: '70%',
    height: 1,
    backgroundColor: YUGI.rimGold,
  },
  bottomRim: {
    position: 'absolute',
    bottom: 12,
    width: '70%',
    height: 1,
    backgroundColor: YUGI.rimGold,
  },
  namePressable: {
    alignItems: 'center',
    marginBottom: 16,
  },
  playerName: {
    fontFamily: FONT_MONO,
    fontSize: 38,
    letterSpacing: 4,
    textTransform: 'uppercase',
    opacity: 0.9,
  },
  nameUnderline: {
    marginTop: 4,
    width: '80%',
    height: 1,
    opacity: 0.5,
  },
  lpContainer: {
    alignItems: 'center',
    marginVertical: 50,
  },
  lpLabel: {
    fontFamily: FONT_MONO,
    fontSize: 14,
    letterSpacing: 5,
    color: YUGI.bronze,
    opacity: 0.6,
    marginBottom: 4,
  },
  lpDisplay: {
    fontFamily: FONT_MONO,
    fontWeight: 'bold',
    minWidth: 350,
    textAlign: 'center',
  },
  lpGlow: {
    marginTop: 6,
    width: 120,
    height: 2,
    borderRadius: 1,
    opacity: 0.35,
  },
  controlsContainer: {
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  input: {
    backgroundColor: YUGI.glassGold,
    borderWidth: 2,
    borderColor: YUGI.glassBorder,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 18,
    fontFamily: FONT_MONO,
    width: 156,
    textAlign: 'center',
    height: 56,
    borderRadius: 4,
    color: YUGI.goldLight,
  },
  btn: {
    backgroundColor: YUGI.glassGold,
    borderWidth: 2,
    paddingHorizontal: 22,
    paddingVertical: 8,
    minWidth: 72,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 4,
  },
  btnText: {
    fontFamily: FONT_MONO,
    fontSize: 22,
    fontWeight: 'bold',
  },
});

// ─── HistoryLog ──────────────────────────────────────────
export const historyLogStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    marginLeft: -250,
    width: 500,
    height: 150,
    backgroundColor: YUGI.glassGold,
    borderWidth: 1,
    borderColor: YUGI.glassBorder,
    padding: 10,
    zIndex: 5,
    borderRadius: 4,
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
    backgroundColor: 'rgba(212, 160, 23, 0.05)',
  },
  playerName: {
    fontFamily: FONT_MONO,
    fontSize: 14,
    width: 100,
    textTransform: 'uppercase',
    color: YUGI.goldLight,
  },
  change: {
    fontFamily: FONT_MONO,
    fontSize: 16,
    fontWeight: 'bold',
    width: 80,
    textAlign: 'center',
  },
  arrow: {
    color: YUGI.textDim,
    fontSize: 14,
    marginHorizontal: 10,
  },
  prevLP: {
    fontFamily: FONT_MONO,
    fontSize: 16,
    fontWeight: 'bold',
    color: YUGI.bronze,
  },
  positive: {
    color: YUGI.positive,
  },
  negative: {
    color: YUGI.negative,
  },
});

// ─── WinnerOverlay ───────────────────────────────────────
export const winnerOverlayStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: YUGI.overlay,
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
    color: YUGI.goldLight,
  },
  resetBtn: {
    borderWidth: 1,
    borderColor: YUGI.glassBorder,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 4,
    backgroundColor: YUGI.glassGold,
  },
  resetBtnText: {
    color: YUGI.goldLight,
    fontFamily: FONT_MONO,
    fontSize: 16,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
});

// ─── QuickTool ───────────────────────────────────────────
export const quickToolStyles = StyleSheet.create({
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
    backgroundColor: YUGI.glassGold,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: YUGI.glassBorder,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolLabel: {
    fontSize: 20,
  },
});

// ─── BackgroundGrid ──────────────────────────────────────
// Griglia egiziana: linee oro pallido invece di cyan
export const backgroundGridStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: -50,
    left: -50,
  },
  line: {
    position: 'absolute',
    backgroundColor: 'rgba(212, 160, 23, 0.06)',  // oro egizio tenue
  },
  vertical: {
    width: 1,
    height: '120%',
  },
  horizontal: {
    height: 1,
    width: '120%',
  },
});

// ─── DiceRoll ────────────────────────────────────────────
export const diceRollStyles = StyleSheet.create({
  container: {
    gap: 25,
    position: 'absolute',
    top: 300,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 100,
    fontWeight: 'bold',
    fontFamily: FONT_MONO,
    color: YUGI.goldLight,
  },
  wheelWrapper: {
    alignItems: 'center',
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 19,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: YUGI.goldLight,
    marginBottom: -5,
    zIndex: 10,
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    backgroundColor: YUGI.bgMid,
    borderWidth: 4,
    borderColor: YUGI.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: {
    fontSize: 44,
    fontWeight: 'bold',
    color: YUGI.goldLight,
  },
  divider: {
    position: 'absolute',
    width: 2,
    height: WHEEL_SIZE,
    backgroundColor: YUGI.rimGold,
  },
  centerDot: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: YUGI.gold,
  },
});

// ─── FlipCoinNew ─────────────────────────────────────────
export const coinFlipStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinContainer: {
    width: COIN_SIZE,
    height: COIN_SIZE,
  },
  face: {
    position: 'absolute',
    width: COIN_SIZE,
    height: COIN_SIZE,
    borderRadius: COIN_SIZE / 2,
    backfaceVisibility: 'hidden',
    shadowColor: YUGI.gold,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  faceImage: {
    width: COIN_SIZE,
    height: COIN_SIZE,
    borderRadius: COIN_SIZE / 2,
    resizeMode: 'cover',
  },
});
