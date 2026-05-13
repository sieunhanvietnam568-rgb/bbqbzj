import React, { createContext, useContext, useReducer, type Dispatch } from 'react';
import type { Character, GameMap, GameTime, ChatSession, GameSettings, GameView } from '../types';
import { initialCharacters, initialMap, initialTime, initialChatSessions, initialSettings } from '../data/mockData';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
}

interface GameState {
  view: GameView;
  previousView: GameView | null;
  characters: Character[];
  activeCharacterId: string;
  gameMap: GameMap;
  gameTime: GameTime;
  chatSessions: ChatSession[];
  activeSessionId: string;
  settings: GameSettings;
  notifications: Notification[];
  isDynamicIslandExpanded: boolean;
  isGameStarted: boolean;
}

type GameAction =
  | { type: 'SET_VIEW'; payload: GameView }
  | { type: 'SET_CHARACTER'; payload: string }
  | { type: 'UPDATE_CHARACTER'; payload: Character }
  | { type: 'SET_LOCATION'; payload: string }
  | { type: 'ADVANCE_TIME'; payload: number }
  | { type: 'ADD_MESSAGE'; payload: { sessionId: string; message: ChatSession['messages'][0] } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<GameSettings> }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'TOGGLE_DYNAMIC_ISLAND' }
  | { type: 'START_GAME' }
  | { type: 'RETURN_TO_START' };

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

const initialState: GameState = {
  view: 'start',
  previousView: null,
  characters: initialCharacters,
  activeCharacterId: 'char-1',
  gameMap: initialMap,
  gameTime: initialTime,
  chatSessions: initialChatSessions,
  activeSessionId: 'session-1',
  settings: initialSettings,
  notifications: [],
  isDynamicIslandExpanded: false,
  isGameStarted: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, previousView: state.view, view: action.payload, isDynamicIslandExpanded: false };

    case 'SET_CHARACTER':
      return { ...state, activeCharacterId: action.payload };

    case 'UPDATE_CHARACTER': {
      const idx = state.characters.findIndex((c) => c.id === action.payload.id);
      if (idx === -1) return state;
      const updated = [...state.characters];
      updated[idx] = action.payload;
      return { ...state, characters: updated };
    }

    case 'SET_LOCATION':
      return { ...state, gameMap: { ...state.gameMap, currentLocation: action.payload } };

    case 'ADVANCE_TIME': {
      const totalMinutes = state.gameTime.hour * 60 + state.gameTime.minute + action.payload;
      const dayAdd = Math.floor(totalMinutes / 1440);
      const hour = Math.floor((totalMinutes % 1440) / 60);
      const minute = totalMinutes % 60;
      const periods: GameTime['period'][] = ['清晨', '上午', '下午', '傍晚', '深夜'];
      const periodIdx = hour < 5 ? 4 : hour < 8 ? 0 : hour < 12 ? 1 : hour < 17 ? 2 : hour < 20 ? 3 : 4;
      return {
        ...state,
        gameTime: { day: state.gameTime.day + dayAdd, hour, minute, period: periods[periodIdx] },
      };
    }

    case 'ADD_MESSAGE': {
      const sessions = state.chatSessions.map((s) => {
        if (s.id !== action.payload.sessionId) return s;
        return { ...s, messages: [...s.messages, action.payload.message], updatedAt: Date.now() };
      });
      return { ...state, chatSessions: sessions };
    }

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { ...action.payload, id: generateId() },
        ],
      };

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };

    case 'TOGGLE_DYNAMIC_ISLAND':
      return { ...state, isDynamicIslandExpanded: !state.isDynamicIslandExpanded };

    case 'START_GAME':
      return { ...state, isGameStarted: true, view: 'main' };

    case 'RETURN_TO_START':
      return { ...state, isGameStarted: false, view: 'start' };

    default:
      return state;
  }
}

const GameContext = createContext<{ state: GameState; dispatch: Dispatch<GameAction> } | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

export { generateId };
