import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Users, Map, Settings, ChevronDown, Clock, LogOut } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import type { GameView } from '../../types';
import './DynamicIsland.css';

const navItems: { view: GameView; label: string; icon: React.ElementType }[] = [
  { view: 'main', label: '对话', icon: MessageSquare },
  { view: 'characters', label: '角色', icon: Users },
  { view: 'map', label: '地图', icon: Map },
  { view: 'settings', label: '设置', icon: Settings },
];

export default function DynamicIsland() {
  const { state, dispatch } = useGame();
  const activeChar = state.characters.find((c) => c.id === state.activeCharacterId);

  return (
    <motion.nav
      id="dynamic-island"
      className={`dynamic-island ${state.isDynamicIslandExpanded ? 'expanded' : ''}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      onClick={() => dispatch({ type: 'TOGGLE_DYNAMIC_ISLAND' })}
    >
      <div className="di-collapsed">
        <div className="di-avatar" style={{ background: activeChar?.avatarGradient }}>
          {activeChar?.avatar}
        </div>
        <div className="di-center">
          <Clock size={14} />
          <span className="di-time font-mono-stats">
            {state.gameTime.day}天 {String(state.gameTime.hour).padStart(2, '0')}:{String(state.gameTime.minute).padStart(2, '0')}
          </span>
        </div>
        <ChevronDown size={16} className="di-chevron" />
      </div>

      <AnimatePresence>
        {state.isDynamicIslandExpanded && (
          <motion.div
            className="di-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {navItems.map((item) => (
              <button
                key={item.view}
                id={`nav-${item.view}`}
                className={`di-nav-item ${state.view === item.view ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); dispatch({ type: 'SET_VIEW', payload: item.view }); }}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
