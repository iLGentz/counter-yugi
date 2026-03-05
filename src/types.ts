export interface HistoryEntry {
    player: 1 | 2;
    playerName: string;
    change: number;
    prevLP: number;
    newLP: number;
}
