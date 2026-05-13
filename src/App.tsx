import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from './context/GameContext';
import StartScreen from './components/screens/StartScreen';
import GameShell from './components/screens/GameShell';
import ToastContainer from './components/ui/Toast';

export default function App() {
  const { state } = useGame();

  return (
    <>
      <AnimatePresence mode="wait">
        {state.isGameStarted ? (
          <GameShell key="game-shell" />
        ) : (
          <StartScreen key="start-screen" />
        )}
      </AnimatePresence>
      <ToastContainer />
    </>
  );
}
