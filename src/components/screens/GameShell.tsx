import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import './GameShell.css';
import DynamicIsland from '../ui/DynamicIsland';
import MainPage from './MainPage';
import CharacterScreen from './CharacterScreen';
import MapScreen from './MapScreen';
import SettingsScreen from './SettingsScreen';

const viewComponents: Record<string, React.ComponentType> = {
  main: MainPage,
  characters: CharacterScreen,
  map: MapScreen,
  settings: SettingsScreen,
};

export default function GameShell() {
  const { state } = useGame();
  const ActiveView = viewComponents[state.view] || MainPage;

  return (
    <motion.div
      id="game-shell"
      className="game-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <DynamicIsland />
      <motion.main
        className="game-content"
        key={state.view}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <ActiveView />
      </motion.main>
    </motion.div>
  );
}
