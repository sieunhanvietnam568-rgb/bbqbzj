import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import CharacterList from '../panels/CharacterList';
import CharacterDetail from '../panels/CharacterDetail';
import './CharacterScreen.css';

export default function CharacterScreen() {
  const { state } = useGame();
  const activeChar = state.characters.find((c) => c.id === state.activeCharacterId);

  return (
    <div id="character-screen" className="character-screen">
      <motion.div
        className="char-left"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CharacterList />
      </motion.div>

      <motion.div
        className="char-right"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <AnimatePresence mode="wait">
          {activeChar && (
            <CharacterDetail key={activeChar.id} character={activeChar} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
