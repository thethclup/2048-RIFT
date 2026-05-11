import { create } from 'zustand';
import { initializeGrid, moveGrid, addRandomTile, isGameOver, Direction } from '@/lib/game/engine';

export type RiftStatus = 'active' | 'collapsed';

export interface Rift {
  id: string;
  grid: number[][];
  status: RiftStatus;
}

interface GameState {
  status: 'menu' | 'playing' | 'gameover';
  score: number;
  bestScore: number;
  rifts: Rift[];
  activeRiftId: string;
  
  startGame: () => void;
  move: (direction: Direction) => void;
  setActiveRift: (id: string) => void;
  mergeRifts: () => void;
  spinActiveRift: () => void;
  setBestScore: (score: number) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  status: 'menu',
  score: 0,
  bestScore: 0,
  rifts: [],
  activeRiftId: '',

  startGame: () => {
    const rift1: Rift = { id: 'r1', grid: initializeGrid(), status: 'active' };
    const rift2: Rift = { id: 'r2', grid: initializeGrid(), status: 'active' };
    set({
      status: 'playing',
      score: 0,
      rifts: [rift1, rift2],
      activeRiftId: 'r1',
    });
  },

  setActiveRift: (id) => set({ activeRiftId: id }),

  spinActiveRift: () => {
    set((state) => {
      const newRifts = state.rifts.map(r => {
        if (r.id === state.activeRiftId) {
          // Simple right rotation
          const newGrid = Array(4).fill(null).map(() => Array(4).fill(0));
          for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
              newGrid[col][3 - row] = r.grid[row][col];
            }
          }
          return { ...r, grid: newGrid };
        }
        return r;
      });
      return { rifts: newRifts };
    });
  },

  mergeRifts: () => {
    set((state) => {
      if (state.rifts.length < 2) return state;
      const r1 = state.rifts[0];
      const r2 = state.rifts[1];
      
      const newGrid1 = r1.grid.map(row => [...row]);
      const newGrid2 = r2.grid.map(row => [...row]);
      let mergeScore = 0;
      let merged = false;

      // Cross-dimensional merge
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (newGrid1[r][c] === newGrid2[r][c] && newGrid1[r][c] !== 0) {
            newGrid1[r][c] *= 2;
            mergeScore += newGrid1[r][c];
            newGrid2[r][c] = 0;
            merged = true;
          }
        }
      }

      if (!merged) return state;

      return {
        score: state.score + mergeScore,
        rifts: [
          { ...r1, grid: newGrid1 },
          { ...r2, grid: newGrid2 }
        ]
      };
    });
  },

  move: (direction) => {
    set((state) => {
      if (state.status !== 'playing') return state;

      const activeRiftIndex = state.rifts.findIndex(r => r.id === state.activeRiftId);
      if (activeRiftIndex === -1) return state;

      const activeRift = state.rifts[activeRiftIndex];
      const { grid, score, moved } = moveGrid(activeRift.grid, direction);

      if (!moved) return state;

      let newGrid = addRandomTile(grid);
      const newScore = state.score + score;

      const newRifts = [...state.rifts];
      const riftOver = isGameOver(newGrid);
      
      newRifts[activeRiftIndex] = {
        ...activeRift,
        grid: newGrid,
        status: riftOver ? 'collapsed' : 'active'
      };

      const allOver = newRifts.every(r => r.status === 'collapsed');

      return {
        rifts: newRifts,
        score: newScore,
        status: allOver ? 'gameover' : 'playing',
      };
    });
  },

  setBestScore: (best) => set({ bestScore: best }),
}));
